import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { FsarchModule } from './fsarch/fsarch.module.js';
import { Attribute } from "./database/entities/attribute.entity.js";
import { AttributeItemType } from "./database/entities/attribute_item_type.entity.js";
import { AttributeLocalization } from "./database/entities/attribute_localization.entity.js";
import { AttributeType } from "./database/entities/attribute_type.entity.js";
import { Catalog } from "./database/entities/catalog.entity.js";
import { Item } from "./database/entities/item.entity.js";
import { ItemJsonAttribute } from "./database/entities/item_json_attribute.entity.js";
import { ItemListAttribute } from "./database/entities/item_list_attribute.entity.js";
import { ItemListAttributeElement } from "./database/entities/item_list_attribute_element.entity.js";
import { ItemType } from "./database/entities/item_type.entity.js";
import { JsonAttribute } from "./database/entities/json_attribute.entity.js";
import { ListAttribute } from "./database/entities/list_attribute.entity.js";
import { ListAttributeElement } from "./database/entities/list_attribute_element.entity.js";
import { ListAttributeElementLocalization } from "./database/entities/list_attribute_element_localization.entity.js";
import { Localization } from "./database/entities/localization.entity.js";
import { BaseTables1720373216667 } from "./database/migrations/1733690865449-base-tables.js";
import { Item1733694484415 } from "./database/migrations/1733694484415-item.js";
import { ItemAttributes1733697377083 } from "./database/migrations/1733697377083-item-attributes.js";

@Module({
  imports: [
    FsarchModule.register({
      auth: {},
      database: {
        entities: [
          Attribute,
          AttributeItemType,
          AttributeLocalization,
          AttributeType,
          Catalog,
          Item,
          ItemJsonAttribute,
          ItemListAttribute,
          ItemListAttributeElement,
          ItemType,
          JsonAttribute,
          ListAttribute,
          ListAttributeElement,
          ListAttributeElementLocalization,
          Localization,
        ],
        migrations: [
          BaseTables1720373216667,
          Item1733694484415,
          ItemAttributes1733697377083,
        ],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
