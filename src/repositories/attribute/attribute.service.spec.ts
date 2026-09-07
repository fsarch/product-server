import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AttributeService } from './attribute.service.js';
import { Attribute } from '../../database/entities/attribute.entity.js';
import { ListAttributeElement } from '../../database/entities/list_attribute_element.entity.js';
import { ListAttribute } from '../../database/entities/list_attribute.entity.js';
import { BooleanAttribute } from '../../database/entities/boolean_attribute.entity.js';
import { NumberAttribute } from '../../database/entities/number_attribute.entity.js';
import { TextAttribute } from '../../database/entities/text_attribute.entity.js';
import { JsonAttribute } from '../../database/entities/json_attribute.entity.js';
import { LinkAttribute } from '../../database/entities/link_attribute.entity.js';
import { ImageAttribute } from '../../database/entities/image_attribute.entity.js';

describe('AttributeService', () => {
  let service: AttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttributeService,
        { provide: getRepositoryToken(Attribute), useValue: {} },
        { provide: getRepositoryToken(ListAttributeElement), useValue: {} },
        { provide: getRepositoryToken(ListAttribute), useValue: {} },
        { provide: getRepositoryToken(BooleanAttribute), useValue: {} },
        { provide: getRepositoryToken(NumberAttribute), useValue: {} },
        { provide: getRepositoryToken(TextAttribute), useValue: {} },
        { provide: getRepositoryToken(JsonAttribute), useValue: {} },
        { provide: getRepositoryToken(LinkAttribute), useValue: {} },
        { provide: getRepositoryToken(ImageAttribute), useValue: {} },
      ],
    }).compile();

    service = module.get<AttributeService>(AttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
