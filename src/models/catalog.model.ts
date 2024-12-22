import { ApiProperty } from "@nestjs/swagger";
import { Catalog } from "../database/entities/catalog.entity.js";

export class CatalogCreateDto {
  @ApiProperty()
  name: string;
}

export class CatalogDto {
  public static FromDbo(catalog: Catalog): CatalogDto {
    const catalogDto = new CatalogDto();

    catalogDto.id = catalog.id;
    catalogDto.name = catalog.name;

    return catalogDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
