import { Module } from '@nestjs/common';
import { AttributeLocalizationService } from './attribute-localization.service.js';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttributeLocalization } from "../../database/entities/attribute_localization.entity.js";

@Module({
  providers: [AttributeLocalizationService],
  exports: [AttributeLocalizationService],
  imports: [TypeOrmModule.forFeature([AttributeLocalization])],
})
export class AttributeLocalizationModule {}
