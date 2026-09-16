import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ItemsController } from './items.controller.js';
import { ItemService } from '../../../repositories/item/item.service.js';
import { AttributeService } from '../../../repositories/attribute/attribute.service.js';
import { AttributeItemTypeService } from '../../../repositories/attribute-item-type/attribute-item-type.service.js';
import { ItemAttributeService } from '../../../repositories/item-attribute/item-attribute.service.js';
import { ItemTypeService } from '../../../repositories/item-type/item-type.service.js';

describe('ItemsController', () => {
  let controller: ItemsController;
  let itemService: { Get: ReturnType<typeof vi.fn>; List: ReturnType<typeof vi.fn> };
  let itemTypeService: { GetByExternalId: ReturnType<typeof vi.fn> };
  let itemAttributeService: { ListCompleteByItemIds: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    itemService = {
      Get: vi.fn(),
      List: vi.fn().mockResolvedValue([]),
    };
    itemTypeService = {
      GetByExternalId: vi.fn(),
    };
    itemAttributeService = {
      ListCompleteByItemIds: vi.fn().mockResolvedValue(new Map()),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        { provide: ItemService, useValue: itemService },
        { provide: AttributeService, useValue: {} },
        { provide: AttributeItemTypeService, useValue: {} },
        { provide: ItemAttributeService, useValue: itemAttributeService },
        { provide: ItemTypeService, useValue: itemTypeService },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get', () => {
    it('throws NotFoundException when the item does not exist', async () => {
      itemService.Get.mockResolvedValue(null);

      await expect(
        controller.Get('catalog-id', 'unknown-item-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('List', () => {
    it('resolves itemTypeExternalId filters to item type ids and passes them to ItemService.List', async () => {
      itemTypeService.GetByExternalId.mockResolvedValue({ id: 'product-item-type-id' });

      await controller.List('catalog-id', undefined, undefined, ['$system.product']);

      expect(itemTypeService.GetByExternalId).toHaveBeenCalledWith('catalog-id', '$system.product');
      expect(itemService.List).toHaveBeenCalledWith('catalog-id', undefined, {
        itemTypeIds: ['product-item-type-id'],
      });
    });

    it('ignores externalIds that do not resolve to an item type', async () => {
      itemTypeService.GetByExternalId.mockResolvedValue(null);

      await controller.List('catalog-id', undefined, undefined, ['$system.unknown']);

      expect(itemService.List).toHaveBeenCalledWith('catalog-id', undefined, {
        itemTypeIds: [],
      });
    });
  });
});
