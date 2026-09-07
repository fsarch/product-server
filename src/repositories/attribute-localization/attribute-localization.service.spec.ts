import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AttributeLocalizationService } from './attribute-localization.service.js';
import { AttributeLocalization } from '../../database/entities/attribute_localization.entity.js';
import { ListAttributeElementLocalization } from '../../database/entities/list_attribute_element_localization.entity.js';

describe('AttributeLocalizationService', () => {
  let service: AttributeLocalizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttributeLocalizationService,
        { provide: getRepositoryToken(AttributeLocalization), useValue: {} },
        { provide: getRepositoryToken(ListAttributeElementLocalization), useValue: {} },
      ],
    }).compile();

    service = module.get<AttributeLocalizationService>(AttributeLocalizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
