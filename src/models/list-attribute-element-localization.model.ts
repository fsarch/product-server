import { ApiProperty } from "@nestjs/swagger";
import { ListAttributeElementLocalization } from "../database/entities/list_attribute_element_localization.entity.js";

export class ListAttributeElementLocalizationSetDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  content: string;
}


export class ListAttributeElementLocalizationDto {
  public static FromDbo(listAttributeElementLocalization: ListAttributeElementLocalization): ListAttributeElementLocalizationDto {
    const listAttributeElementLocalizationDto = new ListAttributeElementLocalizationDto();

    listAttributeElementLocalizationDto.id = listAttributeElementLocalization.id;
    listAttributeElementLocalizationDto.name = listAttributeElementLocalization.name;
    listAttributeElementLocalizationDto.content = listAttributeElementLocalization.content;
    listAttributeElementLocalizationDto.localizationId = listAttributeElementLocalization.localizationId;

    return listAttributeElementLocalizationDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  localizationId: string;
}
