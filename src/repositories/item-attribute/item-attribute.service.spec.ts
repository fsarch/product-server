import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemAttributeService } from './item-attribute.service.js';
import { AttributeService } from '../attribute/attribute.service.js';
import { AttributeItemTypeService } from '../attribute-item-type/attribute-item-type.service.js';
import { ItemService } from '../item/item.service.js';
import { ItemListAttribute } from '../../database/entities/item_list_attribute.entity.js';
import { ItemListAttributeElement } from '../../database/entities/item_list_attribute_element.entity.js';
import { ItemJsonAttribute } from '../../database/entities/item_json_attribute.entity.js';
import { ItemTextAttribute } from '../../database/entities/item_text_attribute.entity.js';
import { ItemNumberAttribute } from '../../database/entities/item_number_attribute.entity.js';
import { ItemBooleanAttribute } from '../../database/entities/item_boolean_attribute.entity.js';
import { ItemLinkAttribute } from '../../database/entities/item_link_attribute.entity.js';
import { ItemLinkAttributeElement } from '../../database/entities/item_link_attribute_element.entity.js';
import { ItemImageAttribute } from '../../database/entities/item_image_attribute.entity.js';
import { ItemImageAttributeElement } from '../../database/entities/item_image_attribute_element.entity.js';

describe('ItemAttributeService', () => {
  let service: ItemAttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemAttributeService,
        { provide: ItemService, useValue: {} },
        { provide: AttributeService, useValue: {} },
        { provide: AttributeItemTypeService, useValue: {} },
        { provide: getRepositoryToken(ItemListAttribute), useValue: {} },
        { provide: getRepositoryToken(ItemListAttributeElement), useValue: {} },
        { provide: getRepositoryToken(ItemJsonAttribute), useValue: {} },
        { provide: getRepositoryToken(ItemTextAttribute), useValue: {} },
        { provide: getRepositoryToken(ItemNumberAttribute), useValue: {} },
        { provide: getRepositoryToken(ItemBooleanAttribute), useValue: {} },
        { provide: getRepositoryToken(ItemLinkAttribute), useValue: {} },
        { provide: getRepositoryToken(ItemLinkAttributeElement), useValue: {} },
        { provide: getRepositoryToken(ItemImageAttribute), useValue: {} },
        { provide: getRepositoryToken(ItemImageAttributeElement), useValue: {} },
      ],
    }).compile();

    service = module.get<ItemAttributeService>(ItemAttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
