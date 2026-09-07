import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AttributeItemTypeService } from './attribute-item-type.service.js';
import { AttributeItemType } from '../../database/entities/attribute_item_type.entity.js';

describe('AttributeItemTypeService', () => {
  let service: AttributeItemTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttributeItemTypeService,
        { provide: getRepositoryToken(AttributeItemType), useValue: {} },
      ],
    }).compile();

    service = module.get<AttributeItemTypeService>(AttributeItemTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
