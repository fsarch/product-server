import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CatalogCreateDto, CatalogDto } from "../../models/catalog.model.js";
import { CatalogService } from "../../repositories/catalog/catalog.service.js";
import { Public } from "../../fsarch/auth/decorators/public.decorator.js";
import { ItemTypeService } from "../../repositories/item-type/item-type.service.js";
import { AttributeService } from "../../repositories/attribute/attribute.service.js";
import { AttributeType } from "../../constants/attribute-type.enum.js";
import { AttributeItemTypeService } from "../../repositories/attribute-item-type/attribute-item-type.service.js";

@ApiTags('catalog')
@Controller({
  path: 'catalogs',
  version: '1',
})
@Public()
@ApiBearerAuth()
export class CatalogsController {
  constructor(
    private readonly catalogService: CatalogService,
    private readonly itemTypeService: ItemTypeService,
    private readonly attributeService: AttributeService,
    private readonly attributeItemTypeService: AttributeItemTypeService,
  ) {}

  @Post()
  public async Post(
    @Body() catalogCreateDto: CatalogCreateDto,
  ) {
    const createdCatalog = await this.catalogService.create(catalogCreateDto);

    ((async () => {
      const attribute = await this.attributeService.create(createdCatalog.id, {
        name: 'Name',
        attributeTypeId: AttributeType.TEXT,
        externalId: '$system.name',
      });

      await Promise.all([
        (async () => {
          const productItemType = await this.itemTypeService.Create(createdCatalog.id, {
            name: 'Produkt',
            externalId: '$system.product',
          });

          await this.attributeItemTypeService.Create(productItemType.id, attribute.id, {
            attributeId: attribute.id,
            isRequired: true,
          });
        })(),
        (async () => {
          const groupItemType = await this.itemTypeService.Create(createdCatalog.id, {
            name: 'Gruppe',
            externalId: '$system.group',
          });

          await this.attributeItemTypeService.Create(groupItemType.id, attribute.id, {
            attributeId: attribute.id,
            isRequired: true,
          });
        })(),
      ]);
    })()).catch((err) => console.error(err));

    return {
      id: createdCatalog.id,
    };
  }

  @Get()
  public async List() {
    const catalogs = await this.catalogService.list();

    return catalogs.map(CatalogDto.FromDbo);
  }
}
