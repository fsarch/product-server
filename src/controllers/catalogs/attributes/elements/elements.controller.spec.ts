import { Test, TestingModule } from '@nestjs/testing';
import { ElementsController } from './elements.controller.js';
import { AttributeService } from '../../../../repositories/attribute/attribute.service.js';
import { AttributeLocalizationService } from '../../../../repositories/attribute-localization/attribute-localization.service.js';

describe('ElementsController', () => {
  let controller: ElementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElementsController],
      providers: [
        { provide: AttributeService, useValue: {} },
        { provide: AttributeLocalizationService, useValue: {} },
      ],
    }).compile();

    controller = module.get<ElementsController>(ElementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
