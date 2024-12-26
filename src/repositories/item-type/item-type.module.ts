import { Module } from '@nestjs/common';
import { ItemTypeService } from './item-type.service.js';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemType } from "../../database/entities/item_type.entity.js";
import { AttributeItemType } from "../../database/entities/attribute_item_type.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([ItemType, AttributeItemType])],
  providers: [ItemTypeService],
  exports: [ItemTypeService],
})
export class ItemTypeModule {}
