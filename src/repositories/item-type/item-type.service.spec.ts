import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { vi } from 'vitest';
import { AttributeItemType } from '../../database/entities/attribute_item_type.entity.js';
import { ItemType } from '../../database/entities/item_type.entity.js';
import { ItemTypeService } from './item-type.service.js';

describe('ItemTypeService', () => {
  let service: ItemTypeService;
  let itemTypeRepository: { findOne: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    itemTypeRepository = {
      findOne: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemTypeService,
        { provide: getRepositoryToken(ItemType), useValue: itemTypeRepository },
        { provide: getRepositoryToken(AttributeItemType), useValue: {} },
      ],
    }).compile();

    service = module.get<ItemTypeService>(ItemTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GetByExternalId', () => {
    it('looks up the item type by catalog id and external id', async () => {
      const itemType = {
        id: 'item-type-id',
        catalogId: 'catalog-id',
        externalId: '$system.product',
      };
      itemTypeRepository.findOne.mockResolvedValue(itemType);

      const result = await service.GetByExternalId(
        'catalog-id',
        '$system.product',
      );

      expect(itemTypeRepository.findOne).toHaveBeenCalledWith({
        where: { catalogId: 'catalog-id', externalId: '$system.product' },
      });
      expect(result).toBe(itemType);
    });
  });
});
