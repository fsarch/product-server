import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module.js';
import { LocalizationModule } from './localization/localization.module.js';
import { AttributeModule } from './attribute/attribute.module.js';

@Module({
  imports: [CatalogModule, LocalizationModule, AttributeModule]
})
export class RepositoriesModule {}
