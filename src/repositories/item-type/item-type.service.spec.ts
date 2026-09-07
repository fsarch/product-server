import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemTypeService } from './item-type.service.js';
import { ItemType } from '../../database/entities/item_type.entity.js';
import { AttributeItemType } from '../../database/entities/attribute_item_type.entity.js';

describe('ItemTypeService', () => {
  let service: ItemTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemTypeService,
        { provide: getRepositoryToken(ItemType), useValue: {} },
        { provide: getRepositoryToken(AttributeItemType), useValue: {} },
      ],
    }).compile();

    service = module.get<ItemTypeService>(ItemTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
