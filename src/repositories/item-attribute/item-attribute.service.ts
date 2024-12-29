import { Injectable, NotFoundException } from '@nestjs/common';
import { AttributeService } from "../attribute/attribute.service.js";
import { AttributeItemTypeService } from "../attribute-item-type/attribute-item-type.service.js";
import { ItemService } from "../item/item.service.js";
import { ItemTypeService } from "../item-type/item-type.service.js";
import { Repository } from "typeorm";
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

@Injectable()
export class ItemAttributeService {
  constructor(
    private readonly itemService: ItemService,
    private readonly attributeService: AttributeService,
    private readonly attributeItemTypeService: AttributeItemTypeService,
    @InjectRepository(ItemListAttribute)
    private readonly itemListAttributeRepository: Repository<ItemListAttribute>,
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

  public async CreateBooleanAttribute(itemId: string, booleanAttributeId: string, createDto: ItemBooleanAttributeCreateDto) {
    const createdAttribute = this.itemBooleanAttributeRepository.create({
      id: crypto.randomUUID(),
      itemId,
      booleanAttributeId,
      value: createDto.value,
    });

    return await this.itemBooleanAttributeRepository.save(createdAttribute);
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

  public async CreateJsonAttribute(itemId: string, jsonAttributeId: string, createDto: ItemJsonAttributeCreateDto) {
    const createdAttribute = this.itemJsonAttributeRepository.create({
      id: crypto.randomUUID(),
      itemId,
      jsonAttributeId,
      value: createDto.value,
    });

    return await this.itemJsonAttributeRepository.save(createdAttribute);
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
      .leftJoinAndSelect('attribute', 'a', 'a.id=ila.list_attribute_id')
      .leftJoinAndSelect('list_attribute', 'la', 'la.id=a.id')
      .select('a.id', 'id')
      .addSelect('a.external_id', 'externalId')
      .addSelect('a.name', 'name')
      .addSelect('ila.id', 'item_list_attribute.id')
      .where('a.catalog_id = :catalogId', { catalogId })
      .andWhere('ila.item_id = :itemId', { itemId })
      .execute();

    return listAttributes.map((listAttribute) => {
      const attribute = this.attributeService.mapAttribute(listAttribute);

      return {
        id: listAttribute['item_list_attribute.id'],
        value: listAttribute['item_list_attribute.value'],
        attribute,
      };
    });
  }

  public async ListCompleteByItemId(catalogId: string, itemId: string) {
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
