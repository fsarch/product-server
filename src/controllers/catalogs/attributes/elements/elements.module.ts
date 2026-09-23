import { Module } from '@nestjs/common';
import { AttributeModule } from '../../../../repositories/attribute/attribute.module.js';
import { AttributeLocalizationModule } from '../../../../repositories/attribute-localization/attribute-localization.module.js';
import { ElementsController } from './elements.controller.js';

@Module({
  controllers: [ElementsController],
  imports: [AttributeModule, AttributeLocalizationModule],
})
export class ElementsModule {}
