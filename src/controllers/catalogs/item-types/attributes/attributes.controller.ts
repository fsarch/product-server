import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AttributeItemTypeService } from "../../../../repositories/attribute-item-type/attribute-item-type.service.js";
import { AttributeItemTypeCreateDto, AttributeItemTypeDto } from "../../../../models/attribute-item-type.model.js";

@ApiTags('item-type')
@Controller({
  path: 'catalogs/:catalogId/item-types/:itemTypeId/attributes',
  version: '1',
})
@ApiBearerAuth()
export class AttributesController {
  constructor(
    private readonly attributeItemType: AttributeItemTypeService,
  ) {
  }

  @Get()
  @ApiQuery({
    name: 'embed',
    type: 'string',
    required: false,
    isArray: true,
  })
  public async Get(
    @Param('catalogId') catalogId: string,
    @Param('itemTypeId') itemTypeId: string,
    @Param('embed') embed: Array<string>,
  ) {
    const itemTypes = await this.attributeItemType.ListByItemTypeId(itemTypeId, {
      embedAttribute: embed?.includes('attribute'),
    });

    return itemTypes.map(AttributeItemTypeDto.FromDbo);
  }

  @Post()
  public async Create(
    @Param('itemTypeId') itemTypeId: string,
    @Body() attributeItemTypeCreateDto: AttributeItemTypeCreateDto,
  ) {
    const createdAttributeItemType = await this.attributeItemType.Create(itemTypeId, attributeItemTypeCreateDto.attributeId, attributeItemTypeCreateDto);

    return {
      id: createdAttributeItemType,
    };
  }
}
