import { Test, TestingModule } from '@nestjs/testing';
import { AttributeItemTypeService } from '../../../../repositories/attribute-item-type/attribute-item-type.service.js';
import { AttributesController } from './attributes.controller.js';

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
