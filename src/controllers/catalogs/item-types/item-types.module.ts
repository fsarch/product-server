import { Module } from '@nestjs/common';
import { ItemTypesController } from './item-types.controller.js';
import { ItemTypeModule } from "../../../repositories/item-type/item-type.module.js";
import { AttributesModule } from './attributes/attributes.module.js';

@Module({
  controllers: [ItemTypesController],
  imports: [ItemTypeModule, AttributesModule],
})
export class ItemTypesModule {}
