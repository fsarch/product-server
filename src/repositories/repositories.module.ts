import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module.js';
import { LocalizationModule } from './localization/localization.module.js';
import { AttributeModule } from './attribute/attribute.module.js';
import { AttributeLocalizationModule } from './attribute-localization/attribute-localization.module.js';
import { ItemTypeModule } from './item-type/item-type.module.js';
import { AttributeItemTypeModule } from './attribute-item-type/attribute-item-type.module.js';

@Module({
  imports: [CatalogModule, LocalizationModule, AttributeModule, AttributeLocalizationModule, ItemTypeModule, AttributeItemTypeModule]
})
export class RepositoriesModule {}
