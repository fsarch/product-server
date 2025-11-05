import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
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

  public async List(
    catalogId: string,
    parentItemId: string | null = undefined,
    options?: {
      itemTypeIds?: Array<string>;
    },
  ): Promise<Array<Item & { attributes: Array<ItemAttributeDto<AttributeDto>> }>> {
    let itemQueryBuilder = this.itemRepository.createQueryBuilder('i')
      .select('i.id', 'id')
      .addSelect('i.item_type_id', 'itemTypeId')
      .where('i.catalog_id = :catalogId', { catalogId });

    if (parentItemId) {
      itemQueryBuilder = itemQueryBuilder
        .andWhere('parent_item_id = :parentItemId', { parentItemId })
    }
    if (parentItemId === null) {
      itemQueryBuilder = itemQueryBuilder
        .andWhere('parent_item_id IS NULL')
    }

    console.log('options?.itemTypeIds', options?.itemTypeIds);
    if (options?.itemTypeIds?.length) {
      itemQueryBuilder = itemQueryBuilder
        .andWhere('i.item_type_id IN (:...itemTypeIds)', { itemTypeIds: options.itemTypeIds });
    }

    return itemQueryBuilder
      .execute();
  }

  public async ListRecursiveFlat(
    catalogId: string,
    parentItemId?: string,
  ) {
    const items = await this.List(catalogId, parentItemId === 'null' ? null : parentItemId);

    const mappedItems = await Promise.all(items.map(async (item) => {
      return [item, ...await this.ListRecursiveFlat(catalogId, item.id)];
    }));

    return mappedItems.flat();
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

  public async Delete(catalogId: string, itemId: string): Promise<void> {
    const childItems = await this.ListRecursiveFlat(catalogId, itemId);
    const idsToRemove = childItems.map((i) => i.id);
    idsToRemove.unshift(itemId);

    await this.itemRepository.softDelete({
      id: In(idsToRemove),
    });
  }
}
