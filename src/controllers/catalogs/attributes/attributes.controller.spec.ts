import { Test, TestingModule } from '@nestjs/testing';
import { AttributesController } from './attributes.controller.js';
import { AttributeService } from '../../../repositories/attribute/attribute.service.js';
import { AttributeLocalizationService } from '../../../repositories/attribute-localization/attribute-localization.service.js';

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
