import { Test, TestingModule } from '@nestjs/testing';
import { CatalogsController } from './catalogs.controller.js';
import { CatalogService } from '../../repositories/catalog/catalog.service.js';
import { ItemTypeService } from '../../repositories/item-type/item-type.service.js';
import { AttributeService } from '../../repositories/attribute/attribute.service.js';
import { AttributeItemTypeService } from '../../repositories/attribute-item-type/attribute-item-type.service.js';

describe('CatalogsController', () => {
  let controller: CatalogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogsController],
      providers: [
        { provide: CatalogService, useValue: {} },
        { provide: ItemTypeService, useValue: {} },
        { provide: AttributeService, useValue: {} },
        { provide: AttributeItemTypeService, useValue: {} },
      ],
    }).compile();

    controller = module.get<CatalogsController>(CatalogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
