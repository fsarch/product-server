import { ApiProperty } from "@nestjs/swagger";
import { AttributeLocalization } from "../database/entities/attribute_localization.entity.js";

export class AttributeLocalizationSetDto {
  @ApiProperty()
  name: string;
}

export class AttributeLocalizationDto {
  public static FromDbo(attributeLocalization: AttributeLocalization): AttributeLocalizationDto {
    const attributeLocalizationDto = new AttributeLocalizationDto();

    attributeLocalizationDto.id = attributeLocalization.id;
    attributeLocalizationDto.name = attributeLocalization.name;
    attributeLocalizationDto.localizationId = attributeLocalization.localizationId;

    return attributeLocalizationDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  localizationId: string;

  @ApiProperty()
  name: string;
}
