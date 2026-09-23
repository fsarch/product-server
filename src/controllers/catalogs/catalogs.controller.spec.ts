import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { AttributeService } from '../../repositories/attribute/attribute.service.js';
import { AttributeItemTypeService } from '../../repositories/attribute-item-type/attribute-item-type.service.js';
import { CatalogService } from '../../repositories/catalog/catalog.service.js';
import { ItemTypeService } from '../../repositories/item-type/item-type.service.js';
import { CatalogsController } from './catalogs.controller.js';

describe('CatalogsController', () => {
  let controller: CatalogsController;
  let catalogService: { get: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    catalogService = {
      get: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogsController],
      providers: [
        { provide: CatalogService, useValue: catalogService },
        { provide: ItemTypeService, useValue: {} },
        { provide: AttributeService, useValue: {} },
        { provide: AttributeItemTypeService, useValue: {} },
      ],
    }).compile();

    controller = module.get<CatalogsController>(CatalogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get', () => {
    it('returns the catalog when it exists', async () => {
      catalogService.get.mockResolvedValue({
        id: 'catalog-id',
        name: 'My Catalog',
      });

      const result = await controller.Get('catalog-id');

      expect(catalogService.get).toHaveBeenCalledWith('catalog-id');
      expect(result).toEqual({ id: 'catalog-id', name: 'My Catalog' });
    });

    it('throws NotFoundException when the catalog does not exist', async () => {
      catalogService.get.mockResolvedValue(null);

      await expect(controller.Get('unknown-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
