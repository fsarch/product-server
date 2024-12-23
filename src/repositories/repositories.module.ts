import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module.js';
import { LocalizationModule } from './localization/localization.module.js';
import { AttributeModule } from './attribute/attribute.module.js';
import { AttributeLocalizationModule } from './attribute-localization/attribute-localization.module.js';

@Module({
  imports: [CatalogModule, LocalizationModule, AttributeModule, AttributeLocalizationModule]
})
export class RepositoriesModule {}
