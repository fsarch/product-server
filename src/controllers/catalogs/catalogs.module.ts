import { Module } from '@nestjs/common';
import { CatalogsController } from './catalogs.controller.js';
import { CatalogModule } from "../../repositories/catalog/catalog.module.js";
import { AttributesModule } from './attributes/attributes.module.js';
import { ItemTypesModule } from './item-types/item-types.module.js';
import { ItemTypeModule } from "../../repositories/item-type/item-type.module.js";

@Module({
  controllers: [CatalogsController],
  imports: [CatalogModule, AttributesModule, ItemTypesModule, ItemTypeModule],
})
export class CatalogsModule {}
