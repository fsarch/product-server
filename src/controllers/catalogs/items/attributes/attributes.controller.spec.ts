import { Test, TestingModule } from '@nestjs/testing';
import { AttributesController } from './attributes.controller.js';
import { ItemAttributeService } from '../../../../repositories/item-attribute/item-attribute.service.js';
import { AttributeService } from '../../../../repositories/attribute/attribute.service.js';
import { ItemService } from '../../../../repositories/item/item.service.js';
import { AttributeItemTypeService } from '../../../../repositories/attribute-item-type/attribute-item-type.service.js';

describe('AttributesController', () => {
  let controller: AttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributesController],
      providers: [
        { provide: ItemAttributeService, useValue: {} },
        { provide: AttributeService, useValue: {} },
        { provide: ItemService, useValue: {} },
        { provide: AttributeItemTypeService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AttributesController>(AttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
