import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { AttributeItemType } from "../../database/entities/attribute_item_type.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { AttributeItemTypeCreateDto } from "../../models/attribute-item-type.model.js";
import * as crypto from "node:crypto";

@Injectable()
export class AttributeItemTypeService {
  constructor(
    @InjectRepository(AttributeItemType)
    private readonly attributeItemTypeRepository: Repository<AttributeItemType>,
  ) {
  }

  public async ListByItemTypeId(itemTypeId: string) {
    return this.attributeItemTypeRepository.find({
      where: {
        itemTypeId,
      },
    });
  }

  public async ListByAttributeId(attributeId: string) {
    return this.attributeItemTypeRepository.find({
      where: {
        attributeId,
      },
    });
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
