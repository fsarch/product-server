import { Injectable } from '@nestjs/common';
import { AttributeLocalizationSetDto } from "../../models/attribute-localization.model.js";
import { Repository } from "typeorm";
import { AttributeLocalization } from "../../database/entities/attribute_localization.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import * as crypto from "node:crypto";
import { ListAttributeElementLocalizationSetDto } from "../../models/list-attribute-element-localization.model.js";
import {
  ListAttributeElementLocalization
} from "../../database/entities/list_attribute_element_localization.entity.js";

@Injectable()
export class AttributeLocalizationService {
  constructor(
    @InjectRepository(AttributeLocalization)
    private readonly attributeLocalizationRepository: Repository<AttributeLocalization>,
    @InjectRepository(ListAttributeElementLocalization)
    private readonly listAttributeElementLocalizationRepository: Repository<ListAttributeElementLocalization>,
  ) {
  }

  public async setLocalization(attributeId: string, localizationId: string, setDto: AttributeLocalizationSetDto) {
    let localization = await this.attributeLocalizationRepository.findOne({
      where: {
        localizationId,
        attributeId,
      },
    })

    if (!localization) {
      localization = this.attributeLocalizationRepository.create({
        id: crypto.randomUUID(),
        attributeId,
        localizationId,
        name: setDto.name,
      });
    }

    localization.name = setDto.name;

    return await this.attributeLocalizationRepository.save(localization);
  }

  public async listLocalizationsByAttributeId(attributeId: string): Promise<AttributeLocalization[]> {
    return await this.attributeLocalizationRepository.find({
      where: {
        attributeId,
      },
    });
  }

  public async listElementLocalizations(elementId: string): Promise<ListAttributeElementLocalization[]> {
    return await this.listAttributeElementLocalizationRepository.find({
      where: {
        listAttributeElementId: elementId,
      },
    });
  }

  public async setElementLocalization(elementId: string, localizationId: string, setDto: ListAttributeElementLocalizationSetDto) {
    let localization = await this.listAttributeElementLocalizationRepository.findOne({
      where: {
        localizationId,
        listAttributeElementId: elementId,
      },
    })

    if (!localization) {
      localization = this.listAttributeElementLocalizationRepository.create({
        id: crypto.randomUUID(),
        localizationId,
        listAttributeElementId: elementId,
        name: setDto.name,
        content: setDto.content,
      });
    }

    localization.name = setDto.name;
    localization.content = setDto.content;

    return await this.listAttributeElementLocalizationRepository.save(localization);
  }
}
