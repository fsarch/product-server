import { Module } from '@nestjs/common';
import { AttributeItemTypeModule } from '../../../../repositories/attribute-item-type/attribute-item-type.module.js';
import { ItemTypeModule } from '../../../../repositories/item-type/item-type.module.js';
import { AttributesController } from './attributes.controller.js';

@Module({
  controllers: [AttributesController],
  imports: [ItemTypeModule, AttributeItemTypeModule],
})
export class AttributesModule {}
