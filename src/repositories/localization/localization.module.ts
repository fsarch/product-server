import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localization } from '../../database/entities/localization.entity.js';
import { LocalizationService } from './localization.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Localization])],
  providers: [LocalizationService],
  exports: [LocalizationService],
})
export class LocalizationModule {}
