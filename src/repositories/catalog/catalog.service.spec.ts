import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CatalogService } from './catalog.service.js';
import { Catalog } from '../../database/entities/catalog.entity.js';

describe('CatalogService', () => {
  let service: CatalogService;
  let catalogRepository: { findOne: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    catalogRepository = {
      findOne: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogService,
        { provide: getRepositoryToken(Catalog), useValue: catalogRepository },
      ],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('looks up the catalog by id', async () => {
      const catalog = { id: 'catalog-id', name: 'My Catalog' };
      catalogRepository.findOne.mockResolvedValue(catalog);

      const result = await service.get('catalog-id');

      expect(catalogRepository.findOne).toHaveBeenCalledWith({ where: { id: 'catalog-id' } });
      expect(result).toBe(catalog);
    });
  });
});
