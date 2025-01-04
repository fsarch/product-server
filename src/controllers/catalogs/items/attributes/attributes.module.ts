import { Module } from '@nestjs/common';
import { AttributesController } from './attributes.controller.js';
import { ItemAttributeModule } from "../../../../repositories/item-attribute/item-attribute.module.js";
import { AttributeModule } from "../../../../repositories/attribute/attribute.module.js";
import { AttributeItemTypeModule } from "../../../../repositories/attribute-item-type/attribute-item-type.module.js";
import { ItemModule } from "../../../../repositories/item/item.module.js";

@Module({
  controllers: [AttributesController],
  imports: [
    ItemAttributeModule,
    AttributeModule,
    AttributeItemTypeModule,
    ItemModule,
  ],
})
export class AttributesModule {}
