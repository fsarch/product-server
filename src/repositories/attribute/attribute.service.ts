import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attribute } from "../../database/entities/attribute.entity.js";
import {
  AttributeCreateDto,
  BooleanAttributeCreateDto, JsonAttributeCreateDto,
  ListAttributeCreateDto,
  NumberAttributeCreateDto, TAttributeCreateDto, TextAttributeCreateDto
} from "../../models/attribute.model.js";
import { ListAttribute } from "../../database/entities/list_attribute.entity.js";
import { JsonAttribute } from "../../database/entities/json_attribute.entity.js";
import { TextAttribute } from "../../database/entities/text_attribute.entity.js";
import { NumberAttribute } from "../../database/entities/number_attribute.entity.js";
import { BooleanAttribute } from "../../database/entities/boolean_attribute.entity.js";
import { AttributeType } from "../../constants/attribute-type.enum.js";
import { plainToInstance } from "class-transformer";
import { AttributeDbo } from "../../models/dbo/attribute.dbo.js";
import { TextAttributeDbo } from "../../models/dbo/text-attribute.dbo.js";
import { NumberAttributeDbo } from "../../models/dbo/number-attribute.dbo.js";
import { JsonAttributeDbo } from "../../models/dbo/json-attribute.dbo.js";
import { ListAttributeElement } from "../../database/entities/list_attribute_element.entity.js";
import { ListAttributeElementCreateDto } from "../../models/list-attribute-element.model.js";

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
    @InjectRepository(ListAttributeElement)
    private readonly listAttributeElementRepository: Repository<ListAttributeElement>,
    @InjectRepository(ListAttribute)
    private readonly listAttributeRepository: Repository<ListAttribute>,
    @InjectRepository(BooleanAttribute)
    private readonly booleanAttributeRepository: Repository<BooleanAttribute>,
    @InjectRepository(NumberAttribute)
    private readonly numberAttributeRepository: Repository<NumberAttribute>,
    @InjectRepository(TextAttribute)
    private readonly textAttributeRepository: Repository<TextAttribute>,
    @InjectRepository(JsonAttribute)
    private readonly jsonAttributeRepository: Repository<JsonAttribute>,
  ) {
  }

  public async createListElement(listAttributeId: string, createDto: ListAttributeElementCreateDto) {
    const id = crypto.randomUUID();

    const createdAttributeElement = this.listAttributeElementRepository.create({
      id,
      listAttributeId,
      externalId: createDto.externalId,
    });

    return await this.listAttributeElementRepository.save(createdAttributeElement);
  }

  public async listElementsByAttributeId(listAttributeId: string) {
    return this.listAttributeElementRepository.find({
      where: {
        listAttributeId,
      },
    });
  }

  private async createListAttribute(id: string, createDto: ListAttributeCreateDto) {
    const createdAttribute = this.listAttributeRepository.create({
      id,
    });

    await this.listAttributeRepository.save(createdAttribute);
  }

  private async createBooleanAttribute(id: string, createDto: BooleanAttributeCreateDto) {
    const createdAttribute = this.booleanAttributeRepository.create({
      id,
    });

    await this.booleanAttributeRepository.save(createdAttribute);
  }

  private async createNumberAttribute(id: string, createDto: NumberAttributeCreateDto) {
    const createdAttribute = this.numberAttributeRepository.create({
      id,
      decimals: createDto.decimals,
      minValue: createDto.minValue,
      maxValue: createDto.maxValue,
    });

    await this.numberAttributeRepository.save(createdAttribute);
  }

  private async createTextAttribute(id: string, createDto: TextAttributeCreateDto) {
    const createdAttribute = this.textAttributeRepository.create({
      id,
      minLength: createDto.minLength,
      maxLength: createDto.maxLength,
    });

    await this.textAttributeRepository.save(createdAttribute);
  }

  private async createJsonAttribute(id: string, createDto: JsonAttributeCreateDto) {
    const createdAttribute = this.jsonAttributeRepository.create({
      id,
      schema: createDto.schema,
    });

    await this.jsonAttributeRepository.save(createdAttribute);
  }

  public async create(catalogId: string, attributeCreateDto: TAttributeCreateDto) {
    const id = crypto.randomUUID();

    const createdAttribute = this.attributeRepository.create({
      ...attributeCreateDto,
      catalogId,
      id,
    });

    const savedAttribute = await this.attributeRepository.save(createdAttribute);

    if (attributeCreateDto.attributeTypeId === AttributeType.LIST) {
      await this.createListAttribute(id, attributeCreateDto);
    } else if (attributeCreateDto.attributeTypeId === AttributeType.BOOLEAN) {
      await this.createBooleanAttribute(id, attributeCreateDto);
    } else if (attributeCreateDto.attributeTypeId === AttributeType.NUMBER) {
      await this.createNumberAttribute(id, attributeCreateDto as NumberAttributeCreateDto);
    } else if (attributeCreateDto.attributeTypeId === AttributeType.TEXT) {
      await this.createTextAttribute(id, attributeCreateDto as TextAttributeCreateDto);
    } else if (attributeCreateDto.attributeTypeId === AttributeType.JSON) {
      await this.createJsonAttribute(id, attributeCreateDto as JsonAttributeCreateDto);
    }

    return {
      id: savedAttribute.id,
    };
  }

  public async list() {
    const list = await this.attributeRepository.createQueryBuilder('a')
      .leftJoinAndSelect('text_attribute', 'ta', 'ta.id=a.id')
      .leftJoinAndSelect('number_attribute', 'na', 'na.id=a.id')
      .leftJoinAndSelect('json_attribute', 'ja', 'ja.id=a.id')
      .select('a.id', 'id')
      .addSelect('a.name', 'name')
      .addSelect('ta.min_length', 'text_attribute.minLength')
      .addSelect('ta.max_length', 'text_attribute.maxLength')
      .addSelect('na.min_value', 'number_attribute.minValue')
      .addSelect('na.max_value', 'number_attribute.maxValue')
      .addSelect('na.decimals', 'number_attribute.decimals')
      .addSelect('ja.schema', 'json_attribute.schema')
      .addSelect('a.attribute_type_id', 'attributeTypeId')
      .orderBy('a.name')
      .execute();

    return list.map(this.mapAttribute);
  }

  public async get(id: string) {
    const item = await this.attributeRepository.createQueryBuilder('a')
      .leftJoinAndSelect('text_attribute', 'ta', 'ta.id=a.id')
      .leftJoinAndSelect('number_attribute', 'na', 'na.id=a.id')
      .leftJoinAndSelect('json_attribute', 'ja', 'ja.id=a.id')
      .select('a.id', 'id')
      .addSelect('a.name', 'name')
      .addSelect('ta.min_length', 'text_attribute.minLength')
      .addSelect('ta.max_length', 'text_attribute.maxLength')
      .addSelect('na.min_value', 'number_attribute.minValue')
      .addSelect('na.max_value', 'number_attribute.maxValue')
      .addSelect('na.decimals', 'number_attribute.decimals')
      .addSelect('ja.schema', 'json_attribute.schema')
      .addSelect('a.attribute_type_id', 'attributeTypeId')
      .where('a.id = :id', { id })
      .limit(1)
      .execute();

    if (!item.length) {
      return null;
    }

    return this.mapAttribute(item[0]);
  }

  private mapAttribute(attribute: any) {
    const baseProperties = {
      id: attribute.id,
      name: attribute.name,
      attributeTypeId: attribute.attributeTypeId,
    };

    if (attribute.attributeTypeId === AttributeType.TEXT) {
      return plainToInstance(TextAttributeDbo, {
        ...baseProperties,
        minLength: attribute['text_attribute.minLength'] ? parseInt(attribute['text_attribute.minLength'], 10) : null,
        maxLength: attribute['text_attribute.maxLength'] ? parseInt(attribute['text_attribute.maxLength'], 10) : null,
      });
    } else if (attribute.attributeTypeId === AttributeType.NUMBER) {
      return plainToInstance(NumberAttributeDbo, {
        ...baseProperties,
        minValue: attribute['number_attribute.minValue'] ? parseFloat(attribute['number_attribute.minValue']) : null,
        maxValue: attribute['number_attribute.maxValue'] ? parseFloat(attribute['number_attribute.maxValue']) : null,
        decimals: attribute['number_attribute.decimals'] ? parseInt(attribute['number_attribute.decimals'], 10) : null,
      });
    } else if (attribute.attributeTypeId === AttributeType.JSON) {
      return plainToInstance(JsonAttributeDbo, {
        ...baseProperties,
        schema: attribute['json_attribute.schema'],
      });
    } else {
      return plainToInstance(AttributeDbo, baseProperties);
    }
  }

  public async getByName(catalogId: string, name: string) {
    return await this.attributeRepository.findOne({
      where: {
        catalogId,
        name,
      },
    });
  }
}
