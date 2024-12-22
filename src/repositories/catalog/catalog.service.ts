import { Injectable } from '@nestjs/common';
import { CatalogCreateDto } from "../../models/catalog.model.js";
import { Repository } from "typeorm";
import { Catalog } from "../../database/entities/catalog.entity.js";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog)
    private readonly catalogRepository: Repository<Catalog>,
  ) {
  }

  async create(catalogCreateDto: CatalogCreateDto) {
    const id = crypto.randomUUID();

    const createdCatalog = this.catalogRepository.create({
      ...catalogCreateDto,
      id,
    });

    const savedCatalog = await this.catalogRepository.save(createdCatalog);

    return {
      id: savedCatalog.id,
    };
  }

  async list() {
    return await this.catalogRepository.find();
  }
}
