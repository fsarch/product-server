import { Module } from '@nestjs/common';
import { AttributeModule } from '../../repositories/attribute/attribute.module.js';
import { AttributeItemTypeModule } from '../../repositories/attribute-item-type/attribute-item-type.module.js';
import { CatalogModule } from '../../repositories/catalog/catalog.module.js';
import { ItemTypeModule } from '../../repositories/item-type/item-type.module.js';
import { AttributesModule } from './attributes/attributes.module.js';
import { CatalogsController } from './catalogs.controller.js';
import { ItemTypesModule } from './item-types/item-types.module.js';
import { ItemsModule } from './items/items.module.js';

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
