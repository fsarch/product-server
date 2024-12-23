import { Module } from '@nestjs/common';
import { ElementsController } from './elements.controller.js';
import { AttributeModule } from "../../../../repositories/attribute/attribute.module.js";
import {
  AttributeLocalizationModule
} from "../../../../repositories/attribute-localization/attribute-localization.module.js";

@Module({
  controllers: [ElementsController],
  imports: [AttributeModule, AttributeLocalizationModule],
})
export class ElementsModule {}
