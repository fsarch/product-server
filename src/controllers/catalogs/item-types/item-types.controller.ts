import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Public } from "../../../fsarch/auth/decorators/public.decorator.js";
import { ItemTypeService } from "../../../repositories/item-type/item-type.service.js";
import { ItemTypeCreateDto, ItemTypeDto } from "../../../models/item-type.model.js";
import { AttributeDto } from "../../../models/attribute.model.js";
import { AttributeItemTypeDto } from "../../../models/attribute-item-type.model.js";
import { AttributeItemTypeService } from "../../../repositories/attribute-item-type/attribute-item-type.service.js";
import { AttributeService } from "../../../repositories/attribute/attribute.service.js";

@ApiTags('item-type')
@Controller({
  path: 'catalogs/:catalogId/item-types',
  version: '1',
})
@Public()
@ApiBearerAuth()
export class ItemTypesController {
  constructor(
    private readonly itemTypeService: ItemTypeService,
    private readonly attributeItemTypeService: AttributeItemTypeService,
    private readonly attributeService: AttributeService,
  ) {
  }

  @Get()
  public async Get(
    @Param('catalogId') catalogId: string,
  ) {
    const itemTypes = await this.itemTypeService.List(catalogId);

    return itemTypes.map(ItemTypeDto.FromDbo);
  }

  @Post()
  public async Post(
    @Param('catalogId') catalogId: string,
    @Body() itemTypeDto: ItemTypeCreateDto,
  ) {
    const nameAttribute = await this.attributeService.GetByExternalId(catalogId, '$system.name');
    if (!nameAttribute) {
      throw new Error('could not find name attribute');
    }

    const createdItemType = await this.itemTypeService.Create(catalogId, itemTypeDto);

    await this.attributeItemTypeService.Create(createdItemType.id, nameAttribute.id, {
      isRequired: true,
      attributeId: nameAttribute.id,
    });

    return {
      id: createdItemType.id,
    }
  }
}
