import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { AttributeItemType } from "../../database/entities/attribute_item_type.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { AttributeItemTypeCreateDto } from "../../models/attribute-item-type.model.js";
import * as crypto from "node:crypto";
import { CompleteAttribute } from "../../database/entities/attribute.entity.js";
import { TextAttribute } from "../../database/entities/text_attribute.entity.js";
import { ImageAttribute } from "../../database/entities/image_attribute.entity.js";

type TListOptions = {
  embedAttribute?: boolean;
};

@Injectable()
export class AttributeItemTypeService {
  constructor(
    @InjectRepository(AttributeItemType)
    private readonly attributeItemTypeRepository: Repository<AttributeItemType>,
  ) {
  }

  public async ListByItemTypeId(itemTypeId: string, options: TListOptions) {
    return this.attributeItemTypeRepository.createQueryBuilder('ait')
      .where({
        itemTypeId,
      })
      .leftJoinAndMapOne(
        'ait.attribute',
        CompleteAttribute,
        'at',
        'at.id = ait.attribute_id',
      )
      .leftJoinAndMapOne(
        'at.textAttribute',
        TextAttribute,
        'ta',
        'ta.id = at.id',
      )
      .leftJoinAndMapOne(
        'at.imageAttribute',
        ImageAttribute,
        'ia',
        'ia.id = at.id',
      )
      .getMany();
  }

  public async ListByAttributeId(attributeId: string) {
    return this.attributeItemTypeRepository.find({
      where: {
        attributeId,
      },
    });
  }
  public async GetByItemTypeAndAttributeId(itemTypeId: string, attributeId: string) {
    const itemTypeAttributes = await this.attributeItemTypeRepository.find({
      where: {
        itemTypeId,
        attributeId,
      },
    });

    return itemTypeAttributes[0];
  }

  public async Create(itemTypeId: string, attributeId: string, createDto: AttributeItemTypeCreateDto): Promise<AttributeItemType> {
    const createdAttributeItemType = this.attributeItemTypeRepository.create({
      id: crypto.randomUUID(),
      itemTypeId,
      attributeId,
      isRequired: createDto.isRequired ?? false,
    });

    const savedAttributeItemType = await this.attributeItemTypeRepository.save(createdAttributeItemType);

    return savedAttributeItemType;
  }
}
