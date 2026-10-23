import type { TCustomResourceDefinition } from '@fsarch/server/custom-resource';

/**
 * The custom resources this service serves at `.meta/custom-resources`,
 * written as for standalone (`/v1/catalogs`). Mounted, `@fsarch/server`
 * rewrites the `apiRoutes` paths to the mount's routes (`/v1/<id>/catalogs`).
 */
export const CUSTOM_RESOURCES: Array<TCustomResourceDefinition> = [
  {
    id: 'catalog',
    name: 'Catalog',
    description: 'Catalogs managed by this service.',
    apiRoutes: {
      list: {
        request: {
          path: '/v1/catalogs',
          method: 'GET',
          auth: { type: 'credential-propagation' },
        },
        enablePagination: false,
      },
      get: {
        request: {
          path: '/v1/catalogs/{{id}}',
          method: 'GET',
          auth: { type: 'credential-propagation' },
        },
      },
    },
  },
  {
    id: 'product',
    name: 'Product',
    description: 'Products ($system.product) managed by this service.',
    apiRoutes: {
      list: {
        request: {
          path: '/v1/catalogs/{{$system.crd.catalog.id}}/items',
          method: 'GET',
          auth: { type: 'credential-propagation' },
          queryParams: { itemTypeExternalId: '$system.product' },
        },
        enablePagination: false,
      },
      get: {
        request: {
          path: '/v1/catalogs/{{$system.crd.catalog.id}}/items/{{id}}',
          method: 'GET',
          auth: { type: 'credential-propagation' },
        },
      },
    },
  },
  {
    id: 'group',
    name: 'Group',
    description: 'Groups ($system.group) managed by this service.',
    apiRoutes: {
      list: {
        request: {
          path: '/v1/catalogs/{{$system.crd.catalog.id}}/items',
          method: 'GET',
          auth: { type: 'credential-propagation' },
          queryParams: { itemTypeExternalId: '$system.group' },
        },
        enablePagination: false,
      },
      get: {
        request: {
          path: '/v1/catalogs/{{$system.crd.catalog.id}}/items/{{id}}',
          method: 'GET',
          auth: { type: 'credential-propagation' },
        },
      },
    },
  },
];
