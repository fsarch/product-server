import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ListAttributeElement } from "../database/entities/list_attribute_element.entity.js";
import { ListAttributeElementLocalizationDto } from "./list-attribute-element-localization.model.js";

export class ListAttributeElementCreateDto {
  @ApiProperty()
  @ApiPropertyOptional()
  public externalId?: string;
}

export class ListAttributeElementDto {
  public static FromDbo(listAttributeElement: ListAttributeElement): ListAttributeElementDto {
    const listAttributeElementDto = new ListAttributeElementDto();

    listAttributeElementDto.id = listAttributeElement.id;
    listAttributeElementDto.externalId = listAttributeElement.externalId;

    return listAttributeElementDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  externalId: string;

  @ApiProperty()
  localizations: Array<ListAttributeElementLocalizationDto>;
}
