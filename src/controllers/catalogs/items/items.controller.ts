import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Query } from '@nestjs/common';
import { ItemService } from "../../../repositories/item/item.service.js";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
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
  @ApiQuery({
    name: 'parentItemId',
    required: false,
  })
  @ApiQuery({
    name: 'itemTypeId',
    required: false,
    isArray: true,
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    isArray: true,
  })
  public async List(
    @Param('catalogId') catalogId: string,
    @Query('parentItemId') parentItemId?: string,
    @Query('itemTypeId', new ParseArrayPipe({ items: String, optional: true })) itemTypeIds?: Array<string>,
    @Query('filter', new ParseArrayPipe({ items: String, optional: true })) filters?: Array<string>,
  ) {
    const items = await this.itemService.List(
      catalogId,
      parentItemId === 'null' ? null : parentItemId,
      {
        itemTypeIds,
      }
    );

    const convertedFilters = filters?.map((filter) => {
      const match = filter.match(/^attribute:([^=]+)=(.+)$/);

      if (!match) {
        return;
      }

      return {
        type: 'attribute',
        id: match[1],
        value: match[2],
      }
    }).filter(Boolean);

    const mappedItems = await Promise.all(items.map(async (item) => {
      const attributes = await this.itemAttributeService.ListCompleteByItemId(catalogId, item.id);

      if (convertedFilters?.length) {
        const found = convertedFilters.some((filter) => {
          return attributes.some(attribute => {
            if (attribute.attribute.id !== filter.id) {
              return false;
            }

            if (attribute.value.toString() !== filter.value) {
              return false;
            }

            return true;
          });
        });

        if (!found) {
          return null;
        }
      }

      const itemDto = ItemDto.FromDbo({
        ...item,
        attributes,
      });

      return itemDto;
    }));

    return mappedItems.filter(Boolean);
  }

  @Get(':itemId')
  public async Get(
    @Param('catalogId') catalogId: string,
    @Param('itemId') itemId: string,
  ) {
    const item = await this.itemService.Get(itemId);

    const attributes = await this.itemAttributeService.ListCompleteByItemId(catalogId, item.id);

    const itemDto = ItemDto.FromDbo({
      ...item,
      attributes,
    });

    return itemDto;
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

  @Delete('/:itemId')
  public async Delete(
    @Param('catalogId') catalogId: string,
    @Param('itemId') itemId: string,
  ) {
    await this.itemService.Delete(catalogId, itemId);
  }
}
