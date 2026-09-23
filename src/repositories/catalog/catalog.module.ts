import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalog } from '../../database/entities/catalog.entity.js';
import { CatalogService } from './catalog.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Catalog])],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
