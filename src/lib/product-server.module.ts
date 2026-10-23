import { createServiceModule } from '@fsarch/server';
import { AttributesController } from '../controllers/catalogs/attributes/attributes.controller.js';
import { ElementsController } from '../controllers/catalogs/attributes/elements/elements.controller.js';
import { CatalogsController } from '../controllers/catalogs/catalogs.controller.js';
import { AttributesController as ItemTypeAttributesController } from '../controllers/catalogs/item-types/attributes/attributes.controller.js';
import { ItemTypesController } from '../controllers/catalogs/item-types/item-types.controller.js';
import { AttributesController as ItemAttributesController } from '../controllers/catalogs/items/attributes/attributes.controller.js';
import { ItemsController } from '../controllers/catalogs/items/items.controller.js';
import { LocalizationsController } from '../controllers/localizations/localizations.controller.js';
import { McpToolsController } from '../controllers/mcp/mcp-tools.controller.js';
import { DATABASE_OPTIONS } from '../database/index.js';
import { AttributeService } from '../repositories/attribute/attribute.service.js';
import { AttributeItemTypeService } from '../repositories/attribute-item-type/attribute-item-type.service.js';
import { AttributeLocalizationService } from '../repositories/attribute-localization/attribute-localization.service.js';
import { CatalogService } from '../repositories/catalog/catalog.service.js';
import { ItemService } from '../repositories/item/item.service.js';
import { ItemAttributeService } from '../repositories/item-attribute/item-attribute.service.js';
import { ItemTypeService } from '../repositories/item-type/item-type.service.js';
import { LocalizationService } from '../repositories/localization/localization.service.js';

/**
 * The service's feature module, generated via `@fsarch/server`'s
 * `createServiceModule()` instead of the previous
 * `AppModule -> {ControllersModule, RepositoriesModule}` tree of nested
 * modules, each doing its own unscoped `TypeOrmModule.forFeature(...)`.
 * Flattened because a single `TypeOrmModule.forFeature(entities,
 * connectionName)` call inside `createServiceModule()` only covers
 * providers/controllers declared directly in the generated module.
 *
 * Every controller already declares its full route path itself, so
 * flattening doesn't change any route. The duplicate `AttributesController`
 * class names across sub-resources are imported aliased.
 *
 * `McpToolsController` (`@McpController()`) is listed as an ordinary
 * controller, as before - standalone it's served by `.enableMcp()`, mounted
 * it's re-bound per mount by `@fsarch/server` (see the descriptor's `mcp`).
 */
export const ProductServerModule = createServiceModule({
  entities: DATABASE_OPTIONS.entities,
  controllers: [
    CatalogsController,
    AttributesController,
    ElementsController,
    ItemTypesController,
    ItemTypeAttributesController,
    ItemsController,
    ItemAttributesController,
    LocalizationsController,
    McpToolsController,
  ],
  providers: [
    AttributeService,
    AttributeItemTypeService,
    AttributeLocalizationService,
    CatalogService,
    ItemService,
    ItemAttributeService,
    ItemTypeService,
    LocalizationService,
  ],
});
