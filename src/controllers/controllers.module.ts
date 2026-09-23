import { Module } from '@nestjs/common';
import { CatalogsModule } from './catalogs/catalogs.module.js';
import { LocalizationsModule } from './localizations/localizations.module.js';
import { McpToolsModule } from './mcp/mcp.module.js';

@Module({
  imports: [CatalogsModule, LocalizationsModule, McpToolsModule],
})
export class ControllersModule {}
