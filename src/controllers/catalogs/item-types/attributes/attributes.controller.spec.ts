import { Test, TestingModule } from '@nestjs/testing';
import { AttributesController } from './attributes.controller.js';
import { AttributeItemTypeService } from '../../../../repositories/attribute-item-type/attribute-item-type.service.js';

describe('AttributesController', () => {
  let controller: AttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributesController],
      providers: [{ provide: AttributeItemTypeService, useValue: {} }],
    }).compile();

    controller = module.get<AttributesController>(AttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
