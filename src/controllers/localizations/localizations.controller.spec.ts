import { Test, TestingModule } from '@nestjs/testing';
import { LocalizationsController } from './localizations.controller.js';
import { LocalizationService } from '../../repositories/localization/localization.service.js';

describe('LocalizationsController', () => {
  let controller: LocalizationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalizationsController],
      providers: [{ provide: LocalizationService, useValue: {} }],
    }).compile();

    controller = module.get<LocalizationsController>(LocalizationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
