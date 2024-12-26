import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ItemType } from "../database/entities/item_type.entity.js";

export class ItemTypeDto {
  public static FromDbo(itemType: ItemType): ItemTypeDto {
    const itemTypeDto = new ItemTypeDto();

    itemTypeDto.id = itemType.id;
    itemTypeDto.name = itemType.name;
    itemTypeDto.externalId = itemType.externalId;

    return itemTypeDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @ApiPropertyOptional()
  externalId: string;
}

export class ItemTypeCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @ApiPropertyOptional()
  externalId: string;
}
