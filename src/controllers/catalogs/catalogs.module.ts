import { Module } from '@nestjs/common';
import { CatalogsController } from './catalogs.controller.js';
import { CatalogModule } from "../../repositories/catalog/catalog.module.js";
import { AttributesModule } from './attributes/attributes.module.js';

@Module({
  controllers: [CatalogsController],
  imports: [CatalogModule, AttributesModule],
})
export class CatalogsModule {}
