import { Test, TestingModule } from '@nestjs/testing';
import { ItemTypesController } from './item-types.controller.js';
import { ItemTypeService } from '../../../repositories/item-type/item-type.service.js';
import { AttributeItemTypeService } from '../../../repositories/attribute-item-type/attribute-item-type.service.js';
import { AttributeService } from '../../../repositories/attribute/attribute.service.js';

describe('ItemTypesController', () => {
  let controller: ItemTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemTypesController],
      providers: [
        { provide: ItemTypeService, useValue: {} },
        { provide: AttributeItemTypeService, useValue: {} },
        { provide: AttributeService, useValue: {} },
      ],
    }).compile();

    controller = module.get<ItemTypesController>(ItemTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
