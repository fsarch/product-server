import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';

export class ItemAttributes1733697377083 implements MigrationInterface {
  name = 'ItemAttributes1733697377083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region ItemJsonAttribute
    await queryRunner.createTable(
      new Table({
        name: 'item_json_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item_json_attribute',
          },
          {
            name: 'item_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'json_attribute_id',
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
            name: 'value',
            type: 'jsonb',
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
          name: 'fk__item_json_attribute__item_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item',
        }, {
          name: 'fk__item_json_attribute__json_attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['json_attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'json_attribute',
        }],
        indices: [{
          name: 'IDX__item_json_attribute__item_id',
          columnNames: ['item_id'],
        }, {
          name: 'IDX__item_json_attribute__json_attribute_id',
          columnNames: ['json_attribute_id'],
        }, {
          name: 'IDX__item_json_attribute__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion

    // region ItemListAttribute
    await queryRunner.createTable(
      new Table({
        name: 'item_list_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item_list_attribute',
          },
          {
            name: 'item_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'list_attribute_id',
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
          name: 'fk__item_list_attribute__item_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item',
        }, {
          name: 'fk__item_list_attribute__list_attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['list_attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'list_attribute',
        }],
        indices: [{
          name: 'IDX__item_list_attribute__item_id',
          columnNames: ['item_id'],
        }, {
          name: 'IDX__item_list_attribute__list_attribute_id',
          columnNames: ['list_attribute_id'],
        }, {
          name: 'IDX__item_list_attribute__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion

    // region ItemListAttributeElement
    await queryRunner.createTable(
      new Table({
        name: 'item_list_attribute_element',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item_list_attribute_element',
          },
          {
            name: 'item_list_attribute_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'list_attribute_element_id',
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
          name: 'fk__item_list_attribute_element__item_list_attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_list_attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item_list_attribute',
        }, {
          name: 'fk__item_list_attribute_element__list_attribute_element_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['list_attribute_element_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'list_attribute_element',
        }],
        indices: [{
          name: 'IDX__item_list_attribute__item_list_attribute_id',
          columnNames: ['item_list_attribute_id'],
        }, {
          name: 'IDX__item_list_attribute__list_attribute_element_id',
          columnNames: ['list_attribute_element_id'],
        }, {
          name: 'IDX__item_list_attribute__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item_list_attribute_element');
    await queryRunner.dropTable('item_list_attribute');
    await queryRunner.dropTable('item_json_attribute');
  }
}
