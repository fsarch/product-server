import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';

export class BooleanAttribute1734872207303 implements MigrationInterface {
  name = 'BooleanAttribute1734872207303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region BooleanAttribute
    await queryRunner.createTable(
      new Table({
        name: 'boolean_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__boolean_attribute',
          },
        ],
        foreignKeys: [{
          name: 'fk__boolean_attribute__id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'attribute',
        }],
      }),
    );
    // endregion

    // region ItemBooleanAttribute
    await queryRunner.createTable(
      new Table({
        name: 'item_boolean_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item_boolean_attribute',
          },
          {
            name: 'item_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'boolean_attribute_id',
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
            type: 'boolean',
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
          name: 'fk__item_boolean_attribute__item_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item',
        }, {
          name: 'fk__item_boolean_attribute__boolean_attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['boolean_attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'boolean_attribute',
        }],
        indices: [{
          name: 'IDX__item_boolean_attribute__item_id',
          columnNames: ['item_id'],
        }, {
          name: 'IDX__item_boolean_attribute__boolean_attribute_id',
          columnNames: ['boolean_attribute_id'],
        }, {
          name: 'IDX__item_boolean_attribute__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item_boolean_attribute');
    await queryRunner.dropTable('boolean_attribute');
  }
}
