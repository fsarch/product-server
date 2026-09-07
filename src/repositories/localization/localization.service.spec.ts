import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocalizationService } from './localization.service.js';
import { Localization } from '../../database/entities/localization.entity.js';

describe('LocalizationService', () => {
  let service: LocalizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalizationService,
        { provide: getRepositoryToken(Localization), useValue: {} },
      ],
    }).compile();

    service = module.get<LocalizationService>(LocalizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
