import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';

export class Item1733694484415 implements MigrationInterface {
  name = 'Item1733694484415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region ItemType
    await queryRunner.createTable(
      new Table({
        name: 'item_type',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item_type',
          },
          {
            name: 'catalog_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '256',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '2048',
            isNullable: false,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        foreignKeys: [{
          name: 'fk__item_type__catalog_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['catalog_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'catalog',
        }],
        indices: [{
          name: 'IDX__item_type__catalog_id',
          columnNames: ['catalog_id'],
        }, {
          name: 'IDX__item_type__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion

    // region AttributeItemType
    await queryRunner.createTable(
      new Table({
        name: 'attribute_item_type',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__attribute_item_type',
          },
          {
            name: 'attribute_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'item_type_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'is_required',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        foreignKeys: [{
          name: 'fk__attribute_item_type__attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'attribute',
        }, {
          name: 'fk__attribute_item_type__item_type_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_type_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item_type',
        }],
        indices: [{
          name: 'IDX__attribute_item_type__attribute_id',
          columnNames: ['attribute_id'],
        }, {
          name: 'IDX__attribute_item_type__item_type_id',
          columnNames: ['item_type_id'],
        }, {
          name: 'UX__attribute_item_type__attribute_id__item_type_id',
          columnNames: ['attribute_id', 'item_type_id'],
          where: 'deletion_time IS NULL',
          isUnique: true,
        }],
      }),
    );
    // endregion

    // region Item
    await queryRunner.createTable(
      new Table({
        name: 'item',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item',
          },
          {
            name: 'catalog_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'item_type_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'parent_item_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '256',
            isNullable: true,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        foreignKeys: [{
          name: 'fk__item__catalog_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['catalog_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'catalog',
        }, {
          name: 'fk__item__item_type_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_type_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item_type',
        }, {
          name: 'fk__item__parent_item_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['parent_item_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item',
        }],
        indices: [{
          name: 'IDX__item__catalog_id',
          columnNames: ['catalog_id'],
        }, {
          name: 'IDX__item__item_type_id',
          columnNames: ['item_type_id'],
        }, {
          name: 'IDX__item__parent_item_id',
          columnNames: ['parent_item_id'],
        }, {
          name: 'IDX__item__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item');
    await queryRunner.dropTable('attribute_item_type');
    await queryRunner.dropTable('item_type');
  }
}
