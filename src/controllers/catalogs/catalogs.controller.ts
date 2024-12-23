import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CatalogCreateDto, CatalogDto } from "../../models/catalog.model.js";
import { CatalogService } from "../../repositories/catalog/catalog.service.js";

@ApiTags('catalog')
@Controller({
  path: 'catalogs',
  version: '1',
})
@ApiBearerAuth()
export class CatalogsController {
  constructor(
    private readonly catalogService: CatalogService,
  ) {}

  @Post()
  public async Post(
    @Body() catalogCreateDto: CatalogCreateDto,
  ) {
    const createdCatalog = await this.catalogService.create(catalogCreateDto);

    return {
      id: createdCatalog.id,
    };
  }

  @Get()
  public async List() {
    const catalogs = await this.catalogService.list();

    return catalogs.map(CatalogDto.FromDbo);
  }
}
