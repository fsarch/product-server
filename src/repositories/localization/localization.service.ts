import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Localization } from "../../database/entities/localization.entity.js";
import { LocalizationCreateDto } from "../../models/localization.model.js";

@Injectable()
export class LocalizationService {
  constructor(
    @InjectRepository(Localization)
    private readonly localizationRepository: Repository<Localization>,
  ) {
  }

  async create(localizationCreateDto: LocalizationCreateDto) {
    const id = crypto.randomUUID();

    const createdLocalization = this.localizationRepository.create({
      ...localizationCreateDto,
      id,
    });

    const savedLocalization = await this.localizationRepository.save(createdLocalization);

    return {
      id: savedLocalization.id,
    };
  }

  async list() {
    return await this.localizationRepository.find();
  }
}
