import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CatalogCreateDto, CatalogDto } from "../../models/catalog.model.js";
import { CatalogService } from "../../repositories/catalog/catalog.service.js";
import { Public } from "../../fsarch/auth/decorators/public.decorator.js";
import { ItemTypeService } from "../../repositories/item-type/item-type.service.js";

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
  ) {}

  @Post()
  public async Post(
    @Body() catalogCreateDto: CatalogCreateDto,
  ) {
    const createdCatalog = await this.catalogService.create(catalogCreateDto);

    ((async () => {
      await Promise.all([
        this.itemTypeService.Create(createdCatalog.id, {
          name: 'Produkt',
          externalId: 'system.product',
        }),
        this.itemTypeService.Create(createdCatalog.id, {
          name: 'Gruppe',
          externalId: 'system.group',
        }),
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
