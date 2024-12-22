import { Module } from '@nestjs/common';
import { CatalogsModule } from './catalogs/catalogs.module.js';
import { LocalizationsModule } from './localizations/localizations.module.js';

@Module({
  imports: [CatalogsModule, LocalizationsModule]
})
export class ControllersModule {}
