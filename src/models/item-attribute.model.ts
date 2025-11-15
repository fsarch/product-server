import { ApiProperty } from "@nestjs/swagger";

export class ItemTextAttributeCreateDto {
  @ApiProperty()
  value: string;
}

export class ItemBooleanAttributeCreateDto {
  @ApiProperty()
  value: boolean;
}

export class ItemNumberAttributeCreateDto {
  @ApiProperty()
  value: number;
}

export class ItemJsonAttributeCreateDto {
  @ApiProperty()
  value: unknown;
}

export class ItemListItemAttributeCreateDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}

export class ItemListAttributeCreateDto {
  @ApiProperty({
    type: ItemListItemAttributeCreateDto,
    isArray: true,
  })
  value: Array<ItemListItemAttributeCreateDto>;
}

export class ItemLinkItemAttributeCreateDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}

export class ItemLinkAttributeCreateDto {
  @ApiProperty({
    type: ItemLinkItemAttributeCreateDto,
    isArray: true,
  })
  value: Array<ItemLinkItemAttributeCreateDto>;
}

export class ItemImageAttributeCreateDto {
  @ApiProperty()
  imageId: string;
}
