import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ItemService } from "../../../repositories/item/item.service.js";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Public } from "../../../fsarch/auth/decorators/public.decorator.js";
import { ItemCreateDto, ItemDto } from "../../../models/item.model.js";
import { AttributeService } from "../../../repositories/attribute/attribute.service.js";
import { AttributeItemTypeService } from "../../../repositories/attribute-item-type/attribute-item-type.service.js";
import { ItemAttributeService } from "../../../repositories/item-attribute/item-attribute.service.js";

@ApiTags('items')
@Controller({
  path: 'catalogs/:catalogId/items',
  version: '1',
})
@ApiBearerAuth()
export class ItemsController {
  constructor(
    private readonly itemService: ItemService,
    private readonly attributeService: AttributeService,
    private readonly attributeItemTypeService: AttributeItemTypeService,
    private readonly itemAttributeService: ItemAttributeService,
  ) {
  }

  @Get()
  public async Get(
    @Param('catalogId') catalogId: string,
    @Query('parentItemId') parentItemId?: string,
  ) {
    const items = await this.itemService.List(catalogId, parentItemId);

    return Promise.all(items.map(async (item) => {
      const attributes = await this.itemAttributeService.ListCompleteByItemId(catalogId, item.id);

      const itemDto = ItemDto.FromDbo({
        ...item,
        attributes,
      });

      return itemDto;
    }));
  }

  @Post()
  public async Create(
    @Param('catalogId') catalogId: string,
    @Body() createDto: ItemCreateDto,
  ) {
    const nameAttribute = await this.attributeService.GetByExternalId(catalogId, '$system.name');
    if (!nameAttribute) {
      throw new Error('could not find name attribute');
    }

    const itemAttribute = await this.attributeItemTypeService.GetByItemTypeAndAttributeId(createDto.itemTypeId, nameAttribute.id);
    if (!itemAttribute) {
      throw new Error('could not find name item attribute');
    }

    const createItem = await this.itemService.Create(catalogId, createDto);

    await this.itemAttributeService.CreateTextAttribute(createItem.id, itemAttribute.attributeId, {
      value: createDto.name,
    });

    return {
      id: createItem.id,
    };
  }
}
