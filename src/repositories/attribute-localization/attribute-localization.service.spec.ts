import { Test, TestingModule } from '@nestjs/testing';
import { AttributeLocalizationService } from './attribute-localization.service.js';

describe('AttributeLocalizationService', () => {
  let service: AttributeLocalizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeLocalizationService],
    }).compile();

    service = module.get<AttributeLocalizationService>(AttributeLocalizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
