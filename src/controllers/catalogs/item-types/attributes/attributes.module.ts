import { Module } from '@nestjs/common';
import { AttributesController } from './attributes.controller.js';
import { ItemTypeModule } from "../../../../repositories/item-type/item-type.module.js";
import { AttributeItemTypeModule } from "../../../../repositories/attribute-item-type/attribute-item-type.module.js";

@Module({
  controllers: [AttributesController],
  imports: [ItemTypeModule, AttributeItemTypeModule],
})
export class AttributesModule {}
