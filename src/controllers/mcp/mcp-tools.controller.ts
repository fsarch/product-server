import { UseGuards } from '@nestjs/common';
import { McpController, Tool } from '@fsarch/server/mcp';
import { AuthGuard } from '@fsarch/server/auth';
import { Roles, RolesGuard } from '@fsarch/server/uac';
import { z } from 'zod';
import { CatalogService } from '../../repositories/catalog/catalog.service.js';
import { ItemTypeService } from '../../repositories/item-type/item-type.service.js';
import { ItemService } from '../../repositories/item/item.service.js';
import { ItemAttributeService } from '../../repositories/item-attribute/item-attribute.service.js';
import { AttributeService } from '../../repositories/attribute/attribute.service.js';
import { CatalogDto } from '../../models/catalog.model.js';
import { ItemTypeDto } from '../../models/item-type.model.js';
import { ItemDto } from '../../models/item.model.js';
import { attributeDboToAttributeDto } from '../../models/attribute.model.js';
import { Role } from '../../constants/role.enum.js';

function jsonResult(value: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }],
  };
}

@McpController()
@UseGuards(AuthGuard, RolesGuard)
export class McpToolsController {
  constructor(
    private readonly catalogService: CatalogService,
    private readonly itemTypeService: ItemTypeService,
    private readonly itemService: ItemService,
    private readonly itemAttributeService: ItemAttributeService,
    private readonly attributeService: AttributeService,
  ) {}

  @Tool({
    name: 'list_catalogs',
    description: 'List all product catalogs managed by this service.',
    parameters: z.object({}),
  })
  @Roles(Role.read_catalog)
  async listCatalogs() {
    const catalogs = await this.catalogService.list();

    return jsonResult(catalogs.map(CatalogDto.FromDbo));
  }

  @Tool({
    name: 'get_catalog',
    description: 'Get a single catalog by its id.',
    parameters: z.object({
      catalogId: z.string().describe('The catalog id'),
    }),
  })
  @Roles(Role.read_catalog)
  async getCatalog({ catalogId }: { catalogId: string }) {
    const catalog = await this.catalogService.get(catalogId);

    if (!catalog) {
      return jsonResult({ error: `Catalog ${catalogId} not found` });
    }

    return jsonResult(CatalogDto.FromDbo(catalog));
  }

  @Tool({
    name: 'list_item_types',
    description: 'List the item types (e.g. product, group) defined in a catalog.',
    parameters: z.object({
      catalogId: z.string().describe('The catalog id'),
    }),
  })
  @Roles(Role.read_item_type)
  async listItemTypes({ catalogId }: { catalogId: string }) {
    const itemTypes = await this.itemTypeService.List(catalogId);

    return jsonResult(itemTypes.map(ItemTypeDto.FromDbo));
  }

  @Tool({
    name: 'list_attributes',
    description: 'List the attribute definitions (name, type, external id) available in a catalog.',
    parameters: z.object({
      catalogId: z.string().describe('The catalog id'),
    }),
  })
  @Roles(Role.read_attribute)
  async listAttributes({ catalogId }: { catalogId: string }) {
    const attributes = await this.attributeService.list(catalogId);

    return jsonResult(attributes.map(attributeDboToAttributeDto));
  }

  @Tool({
    name: 'list_items',
    description:
      'List items (products/groups) in a catalog. Optionally filter by parent item, item type external id (e.g. "$system.product", "$system.group"), or by top-level items only.',
    parameters: z.object({
      catalogId: z.string().describe('The catalog id'),
      parentItemId: z
        .string()
        .optional()
        .describe('Only list items whose parent is this item id'),
      topLevelOnly: z
        .boolean()
        .optional()
        .describe('Only list items that have no parent item'),
      itemTypeExternalId: z
        .string()
        .optional()
        .describe('Only list items of this item type external id, e.g. "$system.product" or "$system.group"'),
    }),
  })
  @Roles(Role.read_item)
  async listItems({
    catalogId,
    parentItemId,
    topLevelOnly,
    itemTypeExternalId,
  }: {
    catalogId: string;
    parentItemId?: string;
    topLevelOnly?: boolean;
    itemTypeExternalId?: string;
  }) {
    let itemTypeIds: Array<string> = [];
    if (itemTypeExternalId) {
      const itemType = await this.itemTypeService.GetByExternalId(catalogId, itemTypeExternalId);
      if (!itemType) {
        return jsonResult({ error: `Item type ${itemTypeExternalId} not found in catalog ${catalogId}` });
      }
      itemTypeIds = [itemType.id];
    }

    const items = await this.itemService.List(
      catalogId,
      topLevelOnly ? null : parentItemId,
      { itemTypeIds },
    );

    const attributesByItemId = await this.itemAttributeService.ListCompleteByItemIds(
      catalogId,
      items.map((item) => item.id),
    );

    const mappedItems = items.map((item) =>
      ItemDto.FromDbo({
        ...item,
        attributes: attributesByItemId.get(item.id) ?? [],
      }),
    );

    return jsonResult(mappedItems);
  }

  @Tool({
    name: 'get_item',
    description: 'Get a single item (product/group) by id, including its attribute values.',
    parameters: z.object({
      catalogId: z.string().describe('The catalog id'),
      itemId: z.string().describe('The item id'),
    }),
  })
  @Roles(Role.read_item)
  async getItem({ catalogId, itemId }: { catalogId: string; itemId: string }) {
    const item = await this.itemService.Get(itemId);

    if (!item) {
      return jsonResult({ error: `Item ${itemId} not found` });
    }

    const attributes = await this.itemAttributeService.ListCompleteByItemId(catalogId, item.id);

    return jsonResult(ItemDto.FromDbo({ ...item, attributes }));
  }
}
