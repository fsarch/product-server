import { Module } from '@nestjs/common';
import { LocalizationsController } from './localizations.controller.js';
import { LocalizationModule } from "../../repositories/localization/localization.module.js";

@Module({
  controllers: [LocalizationsController],
  imports: [LocalizationModule],
})
export class LocalizationsModule {}
