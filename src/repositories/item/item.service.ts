import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "../../database/entities/item.entity.js";
import { ItemAttributeDto, ItemCreateDto } from "../../models/item.model.js";
import { AttributeDto } from "../../models/attribute.model.js";

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {
  }

  public async List(catalogId: string, parentItemId: string | null = null): Promise<Array<Item & { attributes: Array<ItemAttributeDto<AttributeDto>> }>> {
    let itemQueryBuilder = this.itemRepository.createQueryBuilder('i')
      .select('i.id', 'id')
      .where('i.catalog_id = :catalogId', { catalogId });

    if (parentItemId) {
      itemQueryBuilder = itemQueryBuilder
        .andWhere('parent_item_id = :parentItemId', { parentItemId })
    }

    return itemQueryBuilder
      .execute();
  }

  public async Get(itemId: string): Promise<Item | null> {
    return this.itemRepository.findOne({
      where: {
        id: itemId,
      },
    });
  }

  public async Create(catalogId: string, itemTypeDto: ItemCreateDto): Promise<Item> {
    const createdItem = this.itemRepository.create({
      id: crypto.randomUUID(),
      catalogId,
      itemTypeId: itemTypeDto.itemTypeId,
      parentItemId: itemTypeDto.parentItemId,
      externalId: itemTypeDto.externalId,
    });

    return await this.itemRepository.save(createdItem);
  }
}
