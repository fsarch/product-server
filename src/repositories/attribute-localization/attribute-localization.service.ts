import { Injectable } from '@nestjs/common';
import { AttributeLocalizationSetDto } from "../../models/attribute-localization.model.js";
import { Repository } from "typeorm";
import { AttributeLocalization } from "../../database/entities/attribute_localization.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import * as crypto from "node:crypto";

@Injectable()
export class AttributeLocalizationService {
  constructor(
    @InjectRepository(AttributeLocalization)
    private readonly attributeLocalizationRepository: Repository<AttributeLocalization>,
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
}
