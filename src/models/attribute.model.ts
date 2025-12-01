import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AttributeType } from "../constants/attribute-type.enum.js";
import { Attribute } from "../database/entities/attribute.entity.js";
import { Optional } from "@nestjs/common";
import { IsEnum, IsInt, IsNumber, IsObject, IsOptional, IsString, Min } from "class-validator";
import { TextAttribute } from "../database/entities/text_attribute.entity.js";
import { NumberAttribute } from "../database/entities/number_attribute.entity.js";
import { JsonAttribute } from "../database/entities/json_attribute.entity.js";
import { AttributeLocalizationDto } from "./attribute-localization.model.js";
import { BooleanAttribute } from "../database/entities/boolean_attribute.entity.js";
import { LinkAttribute } from "../database/entities/link_attribute.entity.js";
import { ImageAttribute } from "../database/entities/image_attribute.entity.js";

export class AttributeCreateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  externalId: string;

  @ApiProperty()
  @IsEnum(AttributeType)
  attributeTypeId: AttributeType;
}

export class NumberAttributeCreateDto extends AttributeCreateDto {
  @ApiProperty()
  attributeTypeId = AttributeType.NUMBER;

  @ApiProperty()
  @ApiPropertyOptional()
  @Optional()
  @IsOptional()
  @IsNumber()
  minValue: number;

  @ApiProperty()
  @ApiPropertyOptional()
  @Optional()
  @IsOptional()
  @IsNumber()
  maxValue: number;

  @ApiProperty()
  @ApiPropertyOptional()
  @Optional()
  @IsInt()
  @IsOptional()
  @Min(0)
  decimals: number;
}

export class TextAttributeCreateDto extends AttributeCreateDto {
  @ApiProperty()
  attributeTypeId = AttributeType.TEXT;

  @ApiProperty()
  @ApiPropertyOptional()
  @Optional()
  @IsInt()
  @Min(0)
  @IsOptional()
  minLength: number;

  @ApiProperty()
  @ApiPropertyOptional()
  @Optional()
  @IsInt()
  @Min(0)
  @IsOptional()
  maxLength: number;
}

export class JsonAttributeCreateDto extends AttributeCreateDto {
  @ApiProperty()
  attributeTypeId = AttributeType.JSON;

  @ApiProperty()
  @ApiPropertyOptional()
  @Optional()
  @IsOptional()
  @IsObject()
  schema: unknown;
}

export class BooleanAttributeCreateDto extends AttributeCreateDto {
  @ApiProperty()
  attributeTypeId = AttributeType.BOOLEAN;
}

export class ListAttributeCreateDto extends AttributeCreateDto {
  @ApiProperty()
  attributeTypeId = AttributeType.LIST;
}

export class LinkAttributeCreateDto extends AttributeCreateDto {
  @ApiProperty()
  attributeTypeId = AttributeType.LINK;

  @ApiProperty()
  @ApiPropertyOptional()
  @Optional()
  @IsOptional()
  @IsString()
  itemTypeId: string;
}

export class ImageAttributeCreateDto extends AttributeCreateDto {
  @ApiProperty()
  attributeTypeId = AttributeType.IMAGE;

  @ApiProperty()
  @IsString()
  imageServerUrl: string;
}

export type TAttributeCreateDto = NumberAttributeCreateDto | TextAttributeCreateDto | JsonAttributeCreateDto | BooleanAttributeCreateDto | ListAttributeCreateDto | LinkAttributeCreateDto | ImageAttributeCreateDto;

export class AttributeDto {
  public static CopyFromDbo<T extends AttributeDto>(attribute: Attribute, attributeDto: T): T {
    attributeDto.id = attribute.id;
    attributeDto.name = attribute.name;
    attributeDto.attributeTypeId = attribute.attributeTypeId as AttributeType;

    return attributeDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  catalogId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  attributeTypeId: AttributeType;

  @ApiProperty({
    type: [AttributeLocalizationDto],
  })
  localizations?: Array<AttributeLocalizationDto>;
}

export class TextAttributeDto extends AttributeDto {
  public static FromDbo(attribute: Attribute & TextAttribute): TextAttributeDto {
    const attributeDto = super.CopyFromDbo(attribute, new TextAttributeDto());

    attributeDto.minLength = attribute.minLength;
    attributeDto.maxLength = attribute.maxLength;

    return attributeDto;
  }

  @ApiProperty()
  @Optional()
  minLength?: number;

  @ApiProperty()
  @Optional()
  maxLength?: number;
}

export class NumberAttributeDto extends AttributeDto {
  public static FromDbo(attribute: Attribute & NumberAttribute): NumberAttributeDto {
    const attributeDto = super.CopyFromDbo(attribute, new NumberAttributeDto());

    attributeDto.minValue = attribute.minValue;
    attributeDto.maxValue = attribute.maxValue;
    attributeDto.decimals = attribute.decimals;

    return attributeDto;
  }

  @ApiProperty()
  @Optional()
  minValue?: number;

  @ApiProperty()
  @Optional()
  maxValue?: number;

  @ApiProperty()
  @Optional()
  decimals?: number;
}

export class BooleanAttributeDto extends AttributeDto {
  public static FromDbo(attribute: Attribute & BooleanAttribute): BooleanAttributeDto {
    const attributeDto = super.CopyFromDbo(attribute, new BooleanAttributeDto());

    return attributeDto;
  }
}

export class JsonAttributeDto extends AttributeDto {
  public static FromDbo(attribute: Attribute & JsonAttribute): JsonAttributeDto {
    const attributeDto = super.CopyFromDbo(attribute, new JsonAttributeDto());

    attributeDto.schema = attribute.schema;

    return attributeDto;
  }

  @ApiProperty()
  @Optional()
  schema?: unknown;
}

export class LinkAttributeDto extends AttributeDto {
  public static FromDbo(attribute: Attribute & LinkAttribute): LinkAttributeDto {
    const attributeDto = super.CopyFromDbo(attribute, new LinkAttributeDto());

    attributeDto.itemTypeId = attribute.item_type_id;

    return attributeDto;
  }

  @ApiProperty()
  @Optional()
  itemTypeId?: string;
}

export class ImageAttributeDto extends AttributeDto {
  public static FromDbo(attribute: Attribute & { imageAttribute: ImageAttribute; imageServerUrl?: string; }): ImageAttributeDto {
    const attributeDto = super.CopyFromDbo(attribute, new ImageAttributeDto());

    // TODO: fix different input models!
    attributeDto.imageServerUrl = attribute.imageAttribute?.imageServerUrl ?? attribute.imageServerUrl;

    return attributeDto;
  }

  @ApiProperty()
  @Optional()
  imageServerUrl?: string;
}

export function attributeDboToAttributeDto(attribute: any): AttributeDto {
  if (attribute.attributeTypeId === AttributeType.TEXT) {
    return TextAttributeDto.FromDbo(attribute);
  } else if (attribute.attributeTypeId === AttributeType.NUMBER) {
    return NumberAttributeDto.FromDbo(attribute);
  } else if (attribute.attributeTypeId === AttributeType.JSON) {
    return JsonAttributeDto.FromDbo(attribute);
  } else if (attribute.attributeTypeId === AttributeType.LINK) {
    return LinkAttributeDto.FromDbo(attribute);
  } else if (attribute.attributeTypeId === AttributeType.IMAGE) {
    return ImageAttributeDto.FromDbo(attribute);
  } else {
    return AttributeDto.CopyFromDbo(attribute, new AttributeDto());
  }
}
