import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalog } from '../../database/entities/catalog.entity.js';
import { CatalogCreateDto } from '../../models/catalog.model.js';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog)
    private readonly catalogRepository: Repository<Catalog>,
  ) {}

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

  async get(id: string) {
    return await this.catalogRepository.findOne({
      where: { id },
    });
  }
}
