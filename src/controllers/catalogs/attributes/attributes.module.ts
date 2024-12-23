import { Module } from '@nestjs/common';
import { AttributesController } from './attributes.controller.js';
import { AttributeModule } from "../../../repositories/attribute/attribute.module.js";

@Module({
  controllers: [AttributesController],
  imports: [AttributeModule],
})
export class AttributesModule {}
