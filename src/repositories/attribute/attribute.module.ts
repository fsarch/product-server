import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service.js';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attribute } from "../../database/entities/attribute.entity.js";
import { TextAttribute } from "../../database/entities/text_attribute.entity.js";
import { NumberAttribute } from "../../database/entities/number_attribute.entity.js";
import { BooleanAttribute } from "../../database/entities/boolean_attribute.entity.js";
import { ListAttribute } from "../../database/entities/list_attribute.entity.js";
import { JsonAttribute } from "../../database/entities/json_attribute.entity.js";

@Module({
  providers: [AttributeService],
  exports: [AttributeService],
  imports: [
    TypeOrmModule.forFeature([
      Attribute,
      TextAttribute,
      NumberAttribute,
      BooleanAttribute,
      ListAttribute,
      JsonAttribute,
    ]),
  ],
})
export class AttributeModule {}
