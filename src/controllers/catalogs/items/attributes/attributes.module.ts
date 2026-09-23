import { Module } from '@nestjs/common';
import { AttributeModule } from '../../../../repositories/attribute/attribute.module.js';
import { AttributeItemTypeModule } from '../../../../repositories/attribute-item-type/attribute-item-type.module.js';
import { ItemModule } from '../../../../repositories/item/item.module.js';
import { ItemAttributeModule } from '../../../../repositories/item-attribute/item-attribute.module.js';
import { AttributesController } from './attributes.controller.js';

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
