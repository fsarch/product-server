import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module.js';
import { LocalizationModule } from './localization/localization.module.js';
import { AttributeModule } from './attribute/attribute.module.js';
import { AttributeLocalizationModule } from './attribute-localization/attribute-localization.module.js';
import { ItemTypeModule } from './item-type/item-type.module.js';
import { AttributeItemTypeModule } from './attribute-item-type/attribute-item-type.module.js';
import { ItemModule } from './item/item.module.js';
import { ItemAttributeModule } from './item-attribute/item-attribute.module.js';

@Module({
  imports: [CatalogModule, LocalizationModule, AttributeModule, AttributeLocalizationModule, ItemTypeModule, AttributeItemTypeModule, ItemModule, ItemAttributeModule]
})
export class RepositoriesModule {}
