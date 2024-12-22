import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';

export class NumberAttribute1734872605134 implements MigrationInterface {
  name = 'NumberAttribute1734872605134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region NumberAttribute
    await queryRunner.createTable(
      new Table({
        name: 'number_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__number_attribute',
          },
          {
            name: 'min_value',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'max_value',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'decimals',
            type: 'integer',
            isNullable: true,
          },
        ],
        foreignKeys: [{
          name: 'fk__number_attribute__id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'attribute',
        }],
      }),
    );
    // endregion

    // region ItemNumberAttribute
    await queryRunner.createTable(
      new Table({
        name: 'item_number_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item_number_attribute',
          },
          {
            name: 'item_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'number_attribute_id',
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
            type: 'decimal',
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
          name: 'fk__item_number_attribute__item_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item',
        }, {
          name: 'fk__item_number_attribute__number_attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['number_attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'number_attribute',
        }],
        indices: [{
          name: 'IDX__item_number_attribute__item_id',
          columnNames: ['item_id'],
        }, {
          name: 'IDX__item_number_attribute__number_attribute_id',
          columnNames: ['number_attribute_id'],
        }, {
          name: 'IDX__item_number_attribute__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item_number_attribute');
    await queryRunner.dropTable('number_attribute');
  }
}
