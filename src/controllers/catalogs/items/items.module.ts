import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller.js';
import { ItemModule } from "../../../repositories/item/item.module.js";
import { AttributeModule } from "../../../repositories/attribute/attribute.module.js";
import { AttributeItemTypeModule } from "../../../repositories/attribute-item-type/attribute-item-type.module.js";
import { ItemAttributeModule } from "../../../repositories/item-attribute/item-attribute.module.js";

@Module({
  controllers: [ItemsController],
  imports: [ItemModule, AttributeModule, AttributeItemTypeModule, ItemAttributeModule],
})
export class ItemsModule {}
