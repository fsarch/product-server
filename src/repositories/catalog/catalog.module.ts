import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Catalog } from "../../database/entities/catalog.entity.js";
import { AttributeModule } from './attribute/attribute.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Catalog]), AttributeModule],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
