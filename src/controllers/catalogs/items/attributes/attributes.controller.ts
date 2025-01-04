import { BadRequestException, Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { ItemAttributeService } from "../../../../repositories/item-attribute/item-attribute.service.js";
import { AttributeService } from "../../../../repositories/attribute/attribute.service.js";
import { ItemService } from "../../../../repositories/item/item.service.js";
import { AttributeItemTypeService } from "../../../../repositories/attribute-item-type/attribute-item-type.service.js";
import {
  ItemBooleanAttributeCreateDto, ItemJsonAttributeCreateDto, ItemListAttributeCreateDto,
  ItemNumberAttributeCreateDto,
  ItemTextAttributeCreateDto
} from "../../../../models/item-attribute.model.js";
import { AttributeType } from "../../../../constants/attribute-type.enum.js";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@ApiTags('items')
@Controller({
  path: 'catalogs/:catalogId/items/:itemId/attributes',
  version: '1',
})
@ApiBearerAuth()
export class AttributesController {
  constructor(
    private readonly itemAttributeService: ItemAttributeService,
    private readonly attributeService: AttributeService,
    private readonly itemService: ItemService,
    private readonly attributeItemTypeService: AttributeItemTypeService,
  ) {
  }

  @Get()
  public async Get(
    @Param('catalogId') catalogId: string,
    @Param('itemId') itemId: string,
  ) {
    return await this.itemAttributeService.ListCompleteByItemId(catalogId, itemId);
  }

  @Put(':attributeId')
  @ApiBody({
    schema: {
      oneOf: [{
        $ref: getSchemaPath(ItemTextAttributeCreateDto),
      }, {
        $ref: getSchemaPath(ItemBooleanAttributeCreateDto),
      }, {
        $ref: getSchemaPath(ItemNumberAttributeCreateDto),
      }, {
        $ref: getSchemaPath(ItemJsonAttributeCreateDto),
      }, {
        $ref: getSchemaPath(ItemListAttributeCreateDto),
      }],
    },
  })
  public async SetAttribute(
    @Param('catalogId') catalogId: string,
    @Param('itemId') itemId: string,
    @Param('attributeId') attributeId: string,
    @Body() createDto: ItemTextAttributeCreateDto | ItemBooleanAttributeCreateDto | ItemNumberAttributeCreateDto | ItemJsonAttributeCreateDto | ItemListAttributeCreateDto,
  ) {
    const attribute = await this.attributeService.get(attributeId);
    const item = await this.itemService.Get(itemId);
    const itemAttribute = await this.attributeItemTypeService.GetByItemTypeAndAttributeId(item.id, attribute.id);
    if (!itemAttribute) {
      throw new Error('could not get itemAttribute');
    }

    let attributeCreateDto;
    if (attribute.attributeTypeId === AttributeType.NUMBER) {
      attributeCreateDto = plainToInstance(ItemNumberAttributeCreateDto, createDto);
    } else if (attribute.attributeTypeId === AttributeType.TEXT) {
      attributeCreateDto = plainToInstance(ItemTextAttributeCreateDto, createDto);
    } else if (attribute.attributeTypeId === AttributeType.JSON) {
      attributeCreateDto = plainToInstance(ItemJsonAttributeCreateDto, createDto);
    } else if (attribute.attributeTypeId === AttributeType.BOOLEAN) {
      attributeCreateDto = plainToInstance(ItemBooleanAttributeCreateDto, createDto);
    } else if (attribute.attributeTypeId === AttributeType.LIST) {
      attributeCreateDto = plainToInstance(ItemListAttributeCreateDto, createDto);
    } else {
      throw new Error('unknown attribute type')
    }

    const errors = await validate(attributeCreateDto);
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    if (attribute.attributeTypeId === AttributeType.NUMBER) {
      return this.itemAttributeService.SetNumberAttribute(
        itemId,
        attributeId,
        createDto as ItemNumberAttributeCreateDto,
      );
    } else if (attribute.attributeTypeId === AttributeType.TEXT) {
      return this.itemAttributeService.SetTextAttribute(
        itemId,
        attributeId,
        createDto as ItemTextAttributeCreateDto,
      );
    } else if (attribute.attributeTypeId === AttributeType.JSON) {
      return this.itemAttributeService.SetJsonAttribute(
        itemId,
        attributeId,
        createDto as ItemJsonAttributeCreateDto,
      );
    } else if (attribute.attributeTypeId === AttributeType.BOOLEAN) {
      return this.itemAttributeService.SetBooleanAttribute(
        itemId,
        attributeId,
        createDto as ItemBooleanAttributeCreateDto,
      );
    }
    // else if (attribute.attributeTypeId === AttributeType.LIST) {
    //   attributeCreateDto = plainToInstance(ItemListAttributeCreateDto, createDto);
    // }
  }
}
