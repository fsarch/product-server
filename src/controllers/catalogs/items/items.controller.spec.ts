import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ItemsController } from './items.controller.js';
import { ItemService } from '../../../repositories/item/item.service.js';
import { AttributeService } from '../../../repositories/attribute/attribute.service.js';
import { AttributeItemTypeService } from '../../../repositories/attribute-item-type/attribute-item-type.service.js';
import { ItemAttributeService } from '../../../repositories/item-attribute/item-attribute.service.js';

describe('ItemsController', () => {
  let controller: ItemsController;
  let itemService: { Get: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    itemService = {
      Get: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        { provide: ItemService, useValue: itemService },
        { provide: AttributeService, useValue: {} },
        { provide: AttributeItemTypeService, useValue: {} },
        { provide: ItemAttributeService, useValue: { ListCompleteByItemId: vi.fn() } },
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
});
