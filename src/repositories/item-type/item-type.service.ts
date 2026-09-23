import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeItemType } from '../../database/entities/attribute_item_type.entity.js';
import { ItemType } from '../../database/entities/item_type.entity.js';
import { ItemTypeCreateDto } from '../../models/item-type.model.js';

@Injectable()
export class ItemTypeService {
  constructor(
    @InjectRepository(ItemType)
    private readonly itemTypeRepository: Repository<ItemType>,
    @InjectRepository(AttributeItemType)
    private readonly attributeItemTypeRepository: Repository<AttributeItemType>,
  ) {}

  public async List(catalogId: string) {
    return this.itemTypeRepository.find({
      where: {
        catalogId,
      },
    });
  }

  public async GetByExternalId(catalogId: string, externalId: string) {
    return this.itemTypeRepository.findOne({
      where: {
        catalogId,
        externalId,
      },
    });
  }

  async Create(catalogId: string, itemTypeDto: ItemTypeCreateDto) {
    const createdItemType = this.itemTypeRepository.create({
      ...itemTypeDto,
      catalogId,
      id: crypto.randomUUID(),
    });

    const savedItemType = await this.itemTypeRepository.save(createdItemType);

    return savedItemType;
  }
}
