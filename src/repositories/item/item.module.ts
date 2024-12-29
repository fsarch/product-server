import { Module } from '@nestjs/common';
import { ItemService } from './item.service.js';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "../../database/entities/item.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
