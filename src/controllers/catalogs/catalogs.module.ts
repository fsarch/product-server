import { Module } from '@nestjs/common';
import { CatalogsController } from './catalogs.controller.js';
import { CatalogModule } from "../../repositories/catalog/catalog.module.js";
import { AttributesModule } from './attributes/attributes.module.js';
import { ItemTypesModule } from './item-types/item-types.module.js';
import { ItemTypeModule } from "../../repositories/item-type/item-type.module.js";
import { ItemsModule } from './items/items.module.js';
import { AttributeItemTypeModule } from "../../repositories/attribute-item-type/attribute-item-type.module.js";
import { AttributeModule } from "../../repositories/attribute/attribute.module.js";

@Module({
  controllers: [CatalogsController],
  imports: [
    CatalogModule,
    AttributesModule,
    ItemTypesModule,
    ItemTypeModule,
    ItemsModule,
    AttributeItemTypeModule,
    AttributeModule,
  ],
})
export class CatalogsModule {}
