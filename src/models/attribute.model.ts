import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AttributeType } from "../constants/attribute-type.enum.js";
import { Attribute } from "../database/entities/attribute.entity.js";
import { Optional } from "@nestjs/common";
import { IsEnum, IsInt, IsNumber, IsObject, IsOptional, IsString, Min } from "class-validator";
import { TextAttribute } from "../database/entities/text_attribute.entity.js";
import { NumberAttribute } from "../database/entities/number_attribute.entity.js";
import { JsonAttribute } from "../database/entities/json_attribute.entity.js";

export class AttributeCreateDto {
  @ApiProperty()
  @IsString()
  name: string;

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

export type TAttributeCreateDto = NumberAttributeCreateDto | TextAttributeCreateDto | JsonAttributeCreateDto | BooleanAttributeCreateDto | ListAttributeCreateDto;

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

export function attributeDboToAttributeDto(attribute: any): AttributeDto {
  if (attribute.attributeTypeId === AttributeType.TEXT) {
    return TextAttributeDto.FromDbo(attribute);
  } else if (attribute.attributeTypeId === AttributeType.NUMBER) {
    return NumberAttributeDto.FromDbo(attribute);
  } else if (attribute.attributeTypeId === AttributeType.JSON) {
    return JsonAttributeDto.FromDbo(attribute);
  } else {
    return AttributeDto.CopyFromDbo(attribute, new AttributeDto());
  }
}
