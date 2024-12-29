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

export class ItemListAttributeCreateDto {
}
