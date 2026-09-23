import { Module } from '@nestjs/common';
import { AttributeModule } from '../../../repositories/attribute/attribute.module.js';
import { AttributeItemTypeModule } from '../../../repositories/attribute-item-type/attribute-item-type.module.js';
import { ItemTypeModule } from '../../../repositories/item-type/item-type.module.js';
import { AttributesModule } from './attributes/attributes.module.js';
import { ItemTypesController } from './item-types.controller.js';

@Module({
  controllers: [ItemTypesController],
  imports: [
    ItemTypeModule,
    AttributesModule,
    AttributeItemTypeModule,
    AttributeModule,
  ],
})
export class ItemTypesModule {}
