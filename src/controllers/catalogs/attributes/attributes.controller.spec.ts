import { Test, TestingModule } from '@nestjs/testing';
import { AttributeService } from '../../../repositories/attribute/attribute.service.js';
import { AttributeLocalizationService } from '../../../repositories/attribute-localization/attribute-localization.service.js';
import { AttributesController } from './attributes.controller.js';

describe('AttributesController', () => {
  let controller: AttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributesController],
      providers: [
        { provide: AttributeService, useValue: {} },
        { provide: AttributeLocalizationService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AttributesController>(AttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
