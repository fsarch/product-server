import { Module } from '@nestjs/common';
import { McpToolsController } from './mcp-tools.controller.js';
import { CatalogModule } from '../../repositories/catalog/catalog.module.js';
import { ItemTypeModule } from '../../repositories/item-type/item-type.module.js';
import { ItemModule } from '../../repositories/item/item.module.js';
import { ItemAttributeModule } from '../../repositories/item-attribute/item-attribute.module.js';
import { AttributeModule } from '../../repositories/attribute/attribute.module.js';

@Module({
  imports: [CatalogModule, ItemTypeModule, ItemModule, ItemAttributeModule, AttributeModule],
  controllers: [McpToolsController],
})
export class McpToolsModule {}
