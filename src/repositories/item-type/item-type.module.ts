import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeItemType } from '../../database/entities/attribute_item_type.entity.js';
import { ItemType } from '../../database/entities/item_type.entity.js';
import { ItemTypeService } from './item-type.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ItemType, AttributeItemType])],
  providers: [ItemTypeService],
  exports: [ItemTypeService],
})
export class ItemTypeModule {}
