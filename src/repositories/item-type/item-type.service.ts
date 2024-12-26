import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { ItemType } from "../../database/entities/item_type.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemTypeCreateDto } from "../../models/item-type.model.js";
import { AttributeItemType } from "../../database/entities/attribute_item_type.entity.js";

@Injectable()
export class ItemTypeService {
  constructor(
    @InjectRepository(ItemType)
    private readonly itemTypeRepository: Repository<ItemType>,
    @InjectRepository(AttributeItemType)
    private readonly attributeItemTypeRepository: Repository<AttributeItemType>,
  ) {
  }

  public async List(catalogId: string) {
    return this.itemTypeRepository.find({
      where: {
        catalogId,
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
