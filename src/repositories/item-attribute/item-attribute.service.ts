import { Injectable } from '@nestjs/common';
import { AttributeService } from "../attribute/attribute.service.js";
import { AttributeItemTypeService } from "../attribute-item-type/attribute-item-type.service.js";
import { ItemService } from "../item/item.service.js";
import { In, Repository } from "typeorm";
import { ItemListAttribute } from "../../database/entities/item_list_attribute.entity.js";
import { ItemJsonAttribute } from "../../database/entities/item_json_attribute.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemTextAttribute } from "../../database/entities/item_text_attribute.entity.js";
import { ItemNumberAttribute } from "../../database/entities/item_number_attribute.entity.js";
import { ItemBooleanAttribute } from "../../database/entities/item_boolean_attribute.entity.js";
import { AttributeType } from "../../constants/attribute-type.enum.js";
import {
  ItemBooleanAttributeCreateDto, ItemJsonAttributeCreateDto, ItemListAttributeCreateDto,
  ItemNumberAttributeCreateDto,
  ItemTextAttributeCreateDto
} from "../../models/item-attribute.model.js";
import { ItemListAttributeElement } from "../../database/entities/item_list_attribute_element.entity.js";
import { Attribute } from "../../database/entities/attribute.entity.js";
import { ListAttribute } from "../../database/entities/list_attribute.entity.js";
import { AttributeDbo } from "../../models/dbo/attribute.dbo.js";

@Injectable()
export class ItemAttributeService {
  constructor(
    private readonly itemService: ItemService,
    private readonly attributeService: AttributeService,
    private readonly attributeItemTypeService: AttributeItemTypeService,
    @InjectRepository(ItemListAttribute)
    private readonly itemListAttributeRepository: Repository<ItemListAttribute>,
    @InjectRepository(ItemListAttributeElement)
    private readonly itemListAttributeElementRepository: Repository<ItemListAttributeElement>,
    @InjectRepository(ItemJsonAttribute)
    private readonly itemJsonAttributeRepository: Repository<ItemJsonAttribute>,
    @InjectRepository(ItemTextAttribute)
    private readonly itemTextAttributeRepository: Repository<ItemTextAttribute>,
    @InjectRepository(ItemNumberAttribute)
    private readonly itemNumberAttributeRepository: Repository<ItemNumberAttribute>,
    @InjectRepository(ItemBooleanAttribute)
    private readonly itemBooleanAttributeRepository: Repository<ItemBooleanAttribute>,
  ) {
  }

  async CreateByItemAttributeId(
    itemId: string,
    attributeId: string,
    createDto: ItemTextAttributeCreateDto | ItemBooleanAttributeCreateDto | ItemNumberAttributeCreateDto | ItemJsonAttributeCreateDto | ItemListAttributeCreateDto,
  ) {
    const attribute = await this.attributeService.get(attributeId);
    const item = await this.itemService.Get(itemId);
    const itemAttribute = await this.attributeItemTypeService.GetByItemTypeAndAttributeId(item.id, attribute.id);
    if (!itemAttribute) {
      throw new Error('could not get itemAttribute');
    }

    if (attribute.attributeTypeId === AttributeType.TEXT) {
      return this.CreateTextAttribute(itemId, itemAttribute.id, createDto as ItemTextAttributeCreateDto);
    }

    if (attribute.attributeTypeId === AttributeType.BOOLEAN) {
      return this.CreateBooleanAttribute(itemId, itemAttribute.id, createDto as ItemBooleanAttributeCreateDto);
    }

    if (attribute.attributeTypeId === AttributeType.NUMBER) {
      return this.CreateNumberAttribute(itemId, itemAttribute.id, createDto as ItemNumberAttributeCreateDto);
    }

    if (attribute.attributeTypeId === AttributeType.JSON) {
      return this.CreateJsonAttribute(itemId, itemAttribute.id, createDto as ItemJsonAttributeCreateDto);
    }

    if (attribute.attributeTypeId === AttributeType.LIST) {
      return this.CreateListAttribute(itemId, itemAttribute.id, createDto as ItemListAttributeCreateDto);
    }

    throw new Error('invalid attribute type');
  }

  public async CreateTextAttribute(itemId: string, textAttributeId: string, createDto: ItemTextAttributeCreateDto) {
    const createdAttribute = this.itemTextAttributeRepository.create({
      id: crypto.randomUUID(),
      itemId,
      textAttributeId,
      value: createDto.value,
    });

    return await this.itemTextAttributeRepository.save(createdAttribute);
  }

  public async SetTextAttribute(itemId: string, textAttributeId: string, createDto: ItemTextAttributeCreateDto) {
    let attribute = await this.itemTextAttributeRepository.findOne({
      where: {
        itemId,
        textAttributeId,
      },
    });

    if (!attribute) {
      attribute = this.itemTextAttributeRepository.create({
        id: crypto.randomUUID(),
        itemId,
        textAttributeId,
        value: createDto.value,
      });
    }

    attribute.value = createDto.value;

    return await this.itemTextAttributeRepository.save(attribute);
  }

  public async CreateBooleanAttribute(itemId: string, booleanAttributeId: string, createDto: ItemBooleanAttributeCreateDto) {
    const createdAttribute = this.itemBooleanAttributeRepository.create({
      id: crypto.randomUUID(),
      itemId,
      booleanAttributeId,
      value: createDto.value,
    });

    return await this.itemBooleanAttributeRepository.save(createdAttribute);
  }

  public async SetBooleanAttribute(itemId: string, booleanAttributeId: string, createDto: ItemBooleanAttributeCreateDto) {
    let attribute = await this.itemBooleanAttributeRepository.findOne({
      where: {
        itemId,
        booleanAttributeId,
      },
    });

    if (!attribute) {
      attribute = this.itemBooleanAttributeRepository.create({
        id: crypto.randomUUID(),
        itemId,
        booleanAttributeId,
        value: createDto.value,
      });
    }

    attribute.value = createDto.value;

    return await this.itemBooleanAttributeRepository.save(attribute);
  }

  public async CreateNumberAttribute(itemId: string, numberAttributeId: string, createDto: ItemNumberAttributeCreateDto) {
    const createdAttribute = this.itemNumberAttributeRepository.create({
      id: crypto.randomUUID(),
      itemId,
      numberAttributeId,
      value: createDto.value,
    });

    return await this.itemNumberAttributeRepository.save(createdAttribute);
  }

  public async SetNumberAttribute(itemId: string, numberAttributeId: string, createDto: ItemNumberAttributeCreateDto) {
    let attribute = await this.itemNumberAttributeRepository.findOne({
      where: {
        itemId,
        numberAttributeId,
      },
    });

    if (!attribute) {
      attribute = this.itemNumberAttributeRepository.create({
        id: crypto.randomUUID(),
        itemId,
        numberAttributeId,
        value: createDto.value,
      });
    }

    attribute.value = createDto.value;

    return await this.itemNumberAttributeRepository.save(attribute);
  }

  public async CreateJsonAttribute(itemId: string, jsonAttributeId: string, createDto: ItemJsonAttributeCreateDto) {
    const createdAttribute = this.itemJsonAttributeRepository.create({
      id: crypto.randomUUID(),
      itemId,
      jsonAttributeId,
      value: createDto.value,
    });

    return await this.itemJsonAttributeRepository.save(createdAttribute);
  }

  public async SetJsonAttribute(itemId: string, jsonAttributeId: string, createDto: ItemJsonAttributeCreateDto) {
    let attribute = await this.itemJsonAttributeRepository.findOne({
      where: {
        itemId,
        jsonAttributeId,
      },
    });

    if (!attribute) {
      attribute = this.itemJsonAttributeRepository.create({
        id: crypto.randomUUID(),
        itemId,
        jsonAttributeId,
        value: createDto.value,
      });
    }

    attribute.value = createDto.value;

    return await this.itemJsonAttributeRepository.save(attribute);
  }

  public async SetListAttribute(itemId: string, listAttributeId: string, createDto: ItemListAttributeCreateDto) {
    console.log('createDto', createDto);
    let attribute = await this.itemListAttributeRepository.findOne({
      where: {
        itemId,
        listAttributeId,
      },
    });

    if (!attribute) {
      attribute = this.itemListAttributeRepository.create({
        id: crypto.randomUUID(),
        itemId,
        listAttributeId,
      });

      attribute = await this.itemListAttributeRepository.save(attribute);
    }

    const existingAttributeElements = await this.itemListAttributeElementRepository.find({
      select: {
        id: true,
        listAttributeElementId: true,
      },
      where: {
        itemListAttributeId: attribute.id,
      },
    });

    console.log('existingAttributeElements', existingAttributeElements);

    const toRemove = existingAttributeElements.filter(({ listAttributeElementId }) => !createDto.value.find(({ id }) => listAttributeElementId === id));
    const toAdd = createDto.value.filter(({ id }) => !existingAttributeElements.find(({ itemListAttributeId }) => itemListAttributeId === id));

    if (toRemove.length) {
      await this.itemListAttributeElementRepository.delete({
        id: In(toRemove.map(({id}) => id)),
      });
    }

    if (toAdd.length) {
      for (let itemListItemAttributeCreateDto of toAdd) {
        const createdListElement = this.itemListAttributeElementRepository.create({
          id: crypto.randomUUID(),
          itemListAttributeId: attribute.id,
          listAttributeElementId: itemListItemAttributeCreateDto.id,
        });

        await this.itemListAttributeElementRepository.save(createdListElement);
      }
    }
    console.log('toAdd', toAdd, 'toRemove', toRemove);
  }

  public async CreateListAttribute(itemId: string, listAttributeId: string, createDto: ItemListAttributeCreateDto) {
    const createdAttribute = this.itemListAttributeRepository.create({
      id: crypto.randomUUID(),
      itemId,
      listAttributeId,
    });

    return await this.itemListAttributeRepository.save(createdAttribute);
  }

  public async ListTextAttributes(catalogId: string, itemId: string) {
    const textAttributes = await this.itemTextAttributeRepository.createQueryBuilder('ita')
      .leftJoinAndSelect('attribute', 'a', 'a.id=ita.text_attribute_id')
      .leftJoinAndSelect('text_attribute', 'ta', 'ta.id=a.id')
      .select('a.id', 'id')
      .addSelect('a.name', 'name')
      .addSelect('a.external_id', 'externalId')
      .addSelect('ta.min_length', 'text_attribute.minLength')
      .addSelect('ta.max_length', 'text_attribute.maxLength')
      .addSelect('ita.value', 'item_text_attribute.value')
      .addSelect('ita.id', 'item_text_attribute.id')
      .where('a.catalog_id = :catalogId', { catalogId })
      .andWhere('ita.item_id = :itemId', { itemId })
      .execute();

    return textAttributes.map((textAttribute) => {
      const attribute = this.attributeService.mapAttribute(textAttribute);

      return {
        id: textAttribute['item_text_attribute.id'],
        value: textAttribute['item_text_attribute.value'],
        attribute,
      };
    });
  }

  public async ListNumberAttributes(catalogId: string, itemId: string) {
    const numberAttributes = await this.itemNumberAttributeRepository.createQueryBuilder('ina')
      .leftJoinAndSelect('attribute', 'a', 'a.id=ina.number_attribute_id')
      .leftJoinAndSelect('number_attribute', 'na', 'na.id=a.id')
      .select('a.id', 'id')
      .addSelect('a.name', 'name')
      .addSelect('a.external_id', 'externalId')
      .addSelect('na.min_value', 'number_attribute.minValue')
      .addSelect('na.max_value', 'number_attribute.maxValue')
      .addSelect('na.decimals', 'number_attribute.decimals')
      .addSelect('ina.value', 'item_number_attribute.value')
      .addSelect('ina.id', 'item_number_attribute.id')
      .where('a.catalog_id = :catalogId', { catalogId })
      .andWhere('ina.item_id = :itemId', { itemId })
      .execute();

    return numberAttributes.map((numberAttribute) => {
      const attribute = this.attributeService.mapAttribute(numberAttribute);

      return {
        id: numberAttribute['item_number_attribute.id'],
        value: numberAttribute['item_number_attribute.value'],
        attribute,
      };
    });
  }

  public async ListBooleanAttributes(catalogId: string, itemId: string) {
    const booleanAttributes = await this.itemBooleanAttributeRepository.createQueryBuilder('iba')
      .leftJoinAndSelect('attribute', 'a', 'a.id=iba.boolean_attribute_id')
      .leftJoinAndSelect('boolean_attribute', 'ba', 'ba.id=a.id')
      .select('a.id', 'id')
      .addSelect('a.name', 'name')
      .addSelect('a.external_id', 'externalId')
      .addSelect('iba.value', 'item_boolean_attribute.value')
      .addSelect('iba.id', 'item_boolean_attribute.id')
      .where('a.catalog_id = :catalogId', { catalogId })
      .andWhere('iba.item_id = :itemId', { itemId })
      .execute();

    return booleanAttributes.map((booleanAttribute) => {
      const attribute = this.attributeService.mapAttribute(booleanAttribute);

      return {
        id: booleanAttribute['item_boolean_attribute.id'],
        value: booleanAttribute['item_boolean_attribute.value'],
        attribute,
      };
    });
  }

  public async ListJsonAttributes(catalogId: string, itemId: string) {
    const jsonAttributes = await this.itemJsonAttributeRepository.createQueryBuilder('ija')
      .leftJoinAndSelect('attribute', 'a', 'a.id=ija.json_attribute_id')
      .leftJoinAndSelect('json_attribute', 'ja', 'ja.id=a.id')
      .select('a.id', 'id')
      .addSelect('a.name', 'name')
      .addSelect('a.external_id', 'externalId')
      .addSelect('ja.schema', 'json_attribute.schema')
      .addSelect('ija.value', 'item_json_attribute.value')
      .addSelect('ija.id', 'item_json_attribute.id')
      .where('a.catalog_id = :catalogId', { catalogId })
      .andWhere('ija.item_id = :itemId', { itemId })
      .execute();

    return jsonAttributes.map((jsonAttribute) => {
      const attribute = this.attributeService.mapAttribute(jsonAttribute);

      return {
        id: jsonAttribute['item_json_attribute.id'],
        value: jsonAttribute['item_json_attribute.value'],
        attribute,
      };
    });
  }

  public async ListListAttributes(catalogId: string, itemId: string) {
    const listAttributes = await this.itemListAttributeRepository.createQueryBuilder('ila')
      .leftJoinAndMapOne('ila.attribute', Attribute, 'a', 'a.id=ila.list_attribute_id')
      .leftJoinAndMapOne('ila.list_attribute', ListAttribute, 'la', 'la.id=a.id')
      // .select('a.id', 'id')
      // .addSelect('a.external_id', 'externalId')
      // .addSelect('a.name', 'name')
      // .addSelect('ila.id', 'item_list_attribute.id')
      .leftJoinAndMapMany('ila.items', ItemListAttributeElement, 'itlae', 'ila.id = itlae.itemListAttributeId')
      .where('a.catalog_id = :catalogId', { catalogId })
      .andWhere('ila.item_id = :itemId', { itemId })
      .getMany() as Array<ItemListAttribute & {
          items: Array<ItemListAttributeElement>;
          attribute: Attribute;
          listAttribute: ListAttribute;
        }>;

    console.log('listAttributes', listAttributes);

    return listAttributes.map((listAttribute) => {
      const attribute = this.attributeService.mapAttribute(listAttribute.attribute);

      return {
        id: listAttribute.id,
        attributeId: listAttribute.attribute.id,
        value: listAttribute.items.map(({ listAttributeElementId }) => ({ id: listAttributeElementId })),
        attribute,
      };
    });
  }

  public async ListCompleteByItemId(catalogId: string, itemId: string): Promise<Array<{ id: string; value: unknown; attribute: AttributeDbo }>> {
    const [
      textAttributes,
      numberAttributes,
      booleanAttributes,
      jsonAttributes,
      listAttributes,
    ] = await Promise.all([
      this.ListTextAttributes(catalogId, itemId),
      this.ListNumberAttributes(catalogId, itemId),
      this.ListBooleanAttributes(catalogId, itemId),
      this.ListJsonAttributes(catalogId, itemId),
      this.ListListAttributes(catalogId, itemId),
    ]);

    return [...textAttributes, ...numberAttributes, ...booleanAttributes, ...jsonAttributes, ...listAttributes];
  }
}
