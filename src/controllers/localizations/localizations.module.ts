import { Module } from '@nestjs/common';
import { LocalizationModule } from '../../repositories/localization/localization.module.js';
import { LocalizationsController } from './localizations.controller.js';

@Module({
  controllers: [LocalizationsController],
  imports: [LocalizationModule],
})
export class LocalizationsModule {}
