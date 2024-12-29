import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemAttributeService } from './item-attribute.service.js';
import { ItemListAttribute } from "../../database/entities/item_list_attribute.entity.js";
import { ItemJsonAttribute } from "../../database/entities/item_json_attribute.entity.js";
import { ItemTextAttribute } from "../../database/entities/item_text_attribute.entity.js";
import { ItemNumberAttribute } from "../../database/entities/item_number_attribute.entity.js";
import { ItemBooleanAttribute } from "../../database/entities/item_boolean_attribute.entity.js";
import { ItemModule } from "../item/item.module.js";
import { AttributeModule } from "../attribute/attribute.module.js";
import { AttributeItemTypeModule } from "../attribute-item-type/attribute-item-type.module.js";

@Module({
  providers: [ItemAttributeService],
  exports: [ItemAttributeService],
  imports: [
    TypeOrmModule.forFeature([
      ItemListAttribute,
      ItemJsonAttribute,
      ItemTextAttribute,
      ItemNumberAttribute,
      ItemBooleanAttribute,
    ]),
    ItemModule,
    AttributeModule,
    AttributeItemTypeModule,
  ],
})
export class ItemAttributeModule {}
