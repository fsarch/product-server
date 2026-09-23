import { Module } from '@nestjs/common';
import { AttributeModule } from './attribute/attribute.module.js';
import { AttributeItemTypeModule } from './attribute-item-type/attribute-item-type.module.js';
import { AttributeLocalizationModule } from './attribute-localization/attribute-localization.module.js';
import { CatalogModule } from './catalog/catalog.module.js';
import { ItemModule } from './item/item.module.js';
import { ItemAttributeModule } from './item-attribute/item-attribute.module.js';
import { ItemTypeModule } from './item-type/item-type.module.js';
import { LocalizationModule } from './localization/localization.module.js';

@Module({
  imports: [
    CatalogModule,
    LocalizationModule,
    AttributeModule,
    AttributeLocalizationModule,
    ItemTypeModule,
    AttributeItemTypeModule,
    ItemModule,
    ItemAttributeModule,
  ],
})
export class RepositoriesModule {}
