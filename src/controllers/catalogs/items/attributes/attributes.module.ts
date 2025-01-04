import { Module } from '@nestjs/common';
import { AttributesController } from './attributes.controller.js';
import { ItemAttributeModule } from "../../../../repositories/item-attribute/item-attribute.module.js";

@Module({
  controllers: [AttributesController],
  imports: [ItemAttributeModule],
})
export class AttributesModule {}
