import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module.js';
import { LocalizationModule } from './localization/localization.module.js';

@Module({
  imports: [CatalogModule, LocalizationModule]
})
export class RepositoriesModule {}
