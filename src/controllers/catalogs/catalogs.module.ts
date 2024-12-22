import { Module } from '@nestjs/common';
import { CatalogsController } from './catalogs.controller.js';
import { CatalogModule } from "../../repositories/catalog/catalog.module.js";

@Module({
  controllers: [CatalogsController],
  imports: [CatalogModule],
})
export class CatalogsModule {}
