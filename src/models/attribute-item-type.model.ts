import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AttributeItemType } from "../database/entities/attribute_item_type.entity.js";
import { attributeDboToAttributeDto, AttributeDto } from "./attribute.model.js";

export class AttributeItemTypeCreateDto {
  @ApiProperty()
  @ApiPropertyOptional()
  isRequired?: boolean;

  @ApiProperty()
  attributeId: string;
}

export class AttributeItemTypeDto {
  public static FromDbo(attributeItemType: AttributeItemType): AttributeItemTypeDto {
    const attributeItemTypeDto = new AttributeItemTypeDto();

    attributeItemTypeDto.id = attributeItemType.id;
    attributeItemTypeDto.itemTypeId = attributeItemType.itemTypeId;
    attributeItemTypeDto.attributeId = attributeItemType.attributeId;
    attributeItemTypeDto.isRequired = attributeItemType.isRequired;
    attributeItemTypeDto.attribute = attributeItemType.attribute
      ? attributeDboToAttributeDto(attributeItemType.attribute)
      : undefined;

    return attributeItemTypeDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  itemTypeId: string;

  @ApiProperty()
  attributeId: string;

  @ApiProperty()
  isRequired: boolean;

  @ApiProperty({
    required: false,
  })
  attribute?: AttributeDto;
}
