import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Public } from "../../../../fsarch/auth/decorators/public.decorator.js";
import { AttributeItemTypeService } from "../../../../repositories/attribute-item-type/attribute-item-type.service.js";
import { AttributeItemTypeCreateDto, AttributeItemTypeDto } from "../../../../models/attribute-item-type.model.js";

@ApiTags('item-type')
@Controller({
  path: 'catalogs/:catalogId/item-types/:itemTypeId/attributes',
  version: '1',
})
@Public()
@ApiBearerAuth()
export class AttributesController {
  constructor(
    private readonly attributeItemType: AttributeItemTypeService,
  ) {
  }

  @Get()
  public async Get(
    @Param('itemTypeId') itemTypeId: string,
  ) {
    const itemTypes = await this.attributeItemType.ListByItemTypeId(itemTypeId);

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
