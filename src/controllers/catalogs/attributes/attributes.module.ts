import { Module } from '@nestjs/common';
import { AttributesController } from './attributes.controller.js';
import { AttributeModule } from "../../../repositories/attribute/attribute.module.js";
import {
  AttributeLocalizationModule
} from "../../../repositories/attribute-localization/attribute-localization.module.js";
import { ElementsModule } from './elements/elements.module.js';

@Module({
  controllers: [AttributesController],
  imports: [AttributeModule, AttributeLocalizationModule, ElementsModule],
})
export class AttributesModule {}
