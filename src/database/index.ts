import { Attribute, CompleteAttribute } from './entities/attribute.entity.js';
import { AttributeItemType } from './entities/attribute_item_type.entity.js';
import { AttributeLocalization } from './entities/attribute_localization.entity.js';
import { AttributeType } from './entities/attribute_type.entity.js';
import { Catalog } from './entities/catalog.entity.js';
import { Item } from './entities/item.entity.js';
import { ItemJsonAttribute } from './entities/item_json_attribute.entity.js';
import { ItemListAttribute } from './entities/item_list_attribute.entity.js';
import { ItemListAttributeElement } from './entities/item_list_attribute_element.entity.js';
import { ItemType } from './entities/item_type.entity.js';
import { JsonAttribute } from './entities/json_attribute.entity.js';
import { ListAttribute } from './entities/list_attribute.entity.js';
import { ListAttributeElement } from './entities/list_attribute_element.entity.js';
import { ListAttributeElementLocalization } from './entities/list_attribute_element_localization.entity.js';
import { Localization } from './entities/localization.entity.js';
import { TextAttribute } from './entities/text_attribute.entity.js';
import { NumberAttribute } from './entities/number_attribute.entity.js';
import { BooleanAttribute } from './entities/boolean_attribute.entity.js';
import { ItemBooleanAttribute } from './entities/item_boolean_attribute.entity.js';
import { ItemTextAttribute } from './entities/item_text_attribute.entity.js';
import { ItemNumberAttribute } from './entities/item_number_attribute.entity.js';
import { ImageAttribute } from './entities/image_attribute.entity.js';
import { ItemImageAttribute } from './entities/item_image_attribute.entity.js';
import { ItemImageAttributeElement } from './entities/item_image_attribute_element.entity.js';
import { LinkAttribute } from './entities/link_attribute.entity.js';
import { ItemLinkAttribute } from './entities/item_link_attribute.entity.js';
import { ItemLinkAttributeElement } from './entities/item_link_attribute_element.entity.js';
import { BaseTables1720373216667 } from './migrations/1733690865449-base-tables.js';
import { Item1733694484415 } from './migrations/1733694484415-item.js';
import { ItemAttributes1733697377083 } from './migrations/1733697377083-item-attributes.js';
import { BooleanAttribute1734872207303 } from './migrations/1734872207303-boolean-attribute.js';
import { NumberAttribute1734872605134 } from './migrations/1734872605134-number-attribute.js';
import { TextAttribute1734873407457 } from './migrations/1734873407457-text-attribute.js';
import { ImageAttribute1762639425773 } from './migrations/1762639425773-image-attribute.js';
import { LinkAttribute1762685222868 } from './migrations/1762639425773-link-attribute.js';

export const DATABASE_OPTIONS = {
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
    TextAttribute,
    NumberAttribute,
    BooleanAttribute,
    ItemBooleanAttribute,
    ItemTextAttribute,
    ItemNumberAttribute,
    CompleteAttribute,
    ImageAttribute,
    ItemImageAttribute,
    ItemImageAttributeElement,
    LinkAttribute,
    ItemLinkAttribute,
    ItemLinkAttributeElement,
  ],
  migrations: [
    BaseTables1720373216667,
    Item1733694484415,
    ItemAttributes1733697377083,
    BooleanAttribute1734872207303,
    NumberAttribute1734872605134,
    TextAttribute1734873407457,
    ImageAttribute1762639425773,
    LinkAttribute1762685222868,
  ],
};
