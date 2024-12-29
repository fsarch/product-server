import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Item } from "../database/entities/item.entity.js";
import { Attribute } from "../database/entities/attribute.entity.js";
import { AttributeType } from "../constants/attribute-type.enum.js";
import { ItemListAttribute } from "../database/entities/item_list_attribute.entity.js";
import { ItemTextAttribute } from "../database/entities/item_text_attribute.entity.js";
import { ItemNumberAttribute } from "../database/entities/item_number_attribute.entity.js";
import { ItemBooleanAttribute } from "../database/entities/item_boolean_attribute.entity.js";
import { ItemJsonAttribute } from "../database/entities/item_json_attribute.entity.js";
import {
  AttributeDto,
  BooleanAttributeDto,
  JsonAttributeDto,
  NumberAttributeDto,
  TextAttributeDto
} from "./attribute.model.js";

export class ItemDto {
  public static FromDbo(item: Item & { attributes: Array<ItemAttributeDto<any>> }): ItemDto {
    const itemDto = new ItemDto();

    itemDto.id = item.id;
    itemDto.itemTypeId = item.itemTypeId;
    itemDto.parentItemId = item.parentItemId;
    itemDto.externalId = item.externalId;
    itemDto.name = item.attributes?.find(
      (a) => a.attribute.externalId === '$system.name'
    )?.['value'] || itemDto.id;
    itemDto.attributes = item.attributes;

    return itemDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  itemTypeId: string;

  @ApiProperty()
  @ApiPropertyOptional()
  parentItemId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @ApiPropertyOptional()
  externalId: string;

  @ApiProperty({
    type: [ApiProperty],
    isArray: true,
  })
  @ApiPropertyOptional()
  attributes?: ItemAttributeDto<any>[];
}

export class ItemAttributeDto<T extends AttributeDto> {
  public static CopyFromDbo<U extends ItemAttributeDto<T>, T extends AttributeDto>(
    attribute: (ItemListAttribute
      | ItemTextAttribute
      | ItemNumberAttribute
      | ItemBooleanAttribute
      | ItemJsonAttribute) & { attribute?: T },
    attributeDto: U,
  ): U {
    attributeDto.id = attribute.id;
    attributeDto.attribute = attribute.attribute;

    return attributeDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  attribute: T;
}

export class ItemTextAttributeDto extends ItemAttributeDto<TextAttributeDto> {
  public static FromDbo(itemAttribute: any): ItemTextAttributeDto {
    const attributeDto = super.CopyFromDbo(itemAttribute, new ItemTextAttributeDto());

    attributeDto.value = itemAttribute.value;
    attributeDto.attribute = itemAttribute.attribute;

    return attributeDto;
  }

  @ApiProperty()
  value: string;
}

export class ItemNumberAttributeDto extends ItemAttributeDto<NumberAttributeDto> {
  public static FromDbo(itemAttribute: any): ItemNumberAttributeDto {
    const attributeDto = super.CopyFromDbo(itemAttribute, new ItemNumberAttributeDto());

    attributeDto.value = itemAttribute.value;

    return attributeDto;
  }

  @ApiProperty()
  value: number;
}

export class ItemBooleanAttributeDto extends ItemAttributeDto<BooleanAttributeDto> {
  public static FromDbo(itemAttribute: any): ItemBooleanAttributeDto {
    const attributeDto = super.CopyFromDbo(itemAttribute, new ItemBooleanAttributeDto());

    attributeDto.value = itemAttribute.value;

    return attributeDto;
  }

  @ApiProperty()
  value: boolean;
}

export class ItemJsonAttributeDto extends ItemAttributeDto<JsonAttributeDto> {
  public static FromDbo(itemAttribute: any): ItemJsonAttributeDto {
    const attributeDto = super.CopyFromDbo(itemAttribute, new ItemJsonAttributeDto());

    attributeDto.value = itemAttribute.value;

    return attributeDto;
  }

  @ApiProperty()
  value: boolean;
}

export class ItemCreateDto {
  @ApiProperty()
  itemTypeId: string;

  @ApiProperty()
  @ApiPropertyOptional()
  parentItemId: string;

  @ApiProperty()
  @ApiPropertyOptional()
  externalId: string;

  @ApiProperty()
  name: string;
}
