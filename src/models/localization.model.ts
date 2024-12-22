import { ApiProperty } from "@nestjs/swagger";
import { Localization } from "../database/entities/localization.entity.js";

export class LocalizationCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  languageCode: string;
}

export class LocalizationDto {
  public static FromDbo(catalog: Localization): LocalizationDto {
    const catalogDto = new LocalizationDto();

    catalogDto.id = catalog.id;
    catalogDto.countryCode = catalog.countryCode;
    catalogDto.languageCode = catalog.languageCode;

    return catalogDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  languageCode: string;
}
