import { AppModule } from './app.module.js';
import { FsArchAppBuilder } from '@fsarch/server';
import { DATABASE_OPTIONS } from './database/index.js';
import { Role } from './constants/role.enum.js';

async function bootstrap() {
  const app = await new FsArchAppBuilder(AppModule, {
    name: 'Product-Server',
    version: '1.0.0',
  })
    .addSwagger({
      title: 'Product-Server',
      description: 'The Product-Server API description',
      version: '1.0',
      path: 'docs',
    })
    .enableAuth()
    .enableUac(Object.values(Role))
    .enableMcp()
    .setDatabase(DATABASE_OPTIONS)
    .addCustomResource({
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
    })
    .addCustomResource({
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
    })
    .addCustomResource({
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
    })
    .build();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
