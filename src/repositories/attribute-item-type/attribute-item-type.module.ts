import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeItemType } from '../../database/entities/attribute_item_type.entity.js';
import { AttributeItemTypeService } from './attribute-item-type.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeItemType])],
  providers: [AttributeItemTypeService],
  exports: [AttributeItemTypeService],
})
export class AttributeItemTypeModule {}
