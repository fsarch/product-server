import { Test, TestingModule } from '@nestjs/testing';
import { AttributeItemTypeService } from './attribute-item-type.service.js';

describe('AttributeItemTypeService', () => {
  let service: AttributeItemTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeItemTypeService],
    }).compile();

    service = module.get<AttributeItemTypeService>(AttributeItemTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
