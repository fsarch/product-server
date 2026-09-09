import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDefined, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ItemTextAttributeCreateDto {
  @ApiProperty()
  @IsString()
  value: string;
}

export class ItemBooleanAttributeCreateDto {
  @ApiProperty()
  @IsBoolean()
  value: boolean;
}

export class ItemNumberAttributeCreateDto {
  @ApiProperty()
  @IsNumber()
  value: number;
}

export class ItemJsonAttributeCreateDto {
  @ApiProperty()
  @IsDefined()
  value: unknown;
}

export class ItemListItemAttributeCreateDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  id: string;
}

export class ItemListAttributeCreateDto {
  @ApiProperty({
    type: ItemListItemAttributeCreateDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemListItemAttributeCreateDto)
  value: Array<ItemListItemAttributeCreateDto>;
}

export class ItemLinkItemAttributeCreateDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  id: string;
}

export class ItemLinkAttributeCreateDto {
  @ApiProperty({
    type: ItemLinkItemAttributeCreateDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemLinkItemAttributeCreateDto)
  value: Array<ItemLinkItemAttributeCreateDto>;
}

export class ItemImageAttributeElementCreateDto {
  @ApiProperty()
  @IsString()
  imageId: string;
}

export class ItemImageAttributeCreateDto {
  @ApiProperty({
    type: ItemImageAttributeElementCreateDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemImageAttributeElementCreateDto)
  value: Array<ItemImageAttributeElementCreateDto>;
}
