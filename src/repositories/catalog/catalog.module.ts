import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Catalog } from "../../database/entities/catalog.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([Catalog])],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
