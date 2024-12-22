import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service.js';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Localization } from "../../database/entities/localization.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([Localization])],
  providers: [LocalizationService],
  exports: [LocalizationService],
})
export class LocalizationModule {}
