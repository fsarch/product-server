import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';

export class TextAttribute1734873407457 implements MigrationInterface {
  name = 'TextAttribute1734873407457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region TextAttribute
    await queryRunner.createTable(
      new Table({
        name: 'text_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__text_attribute',
          },
          {
            name: 'min_length',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'max_length',
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

    // region ItemTextAttribute
    await queryRunner.createTable(
      new Table({
        name: 'item_text_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item_text_attribute',
          },
          {
            name: 'item_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'text_attribute_id',
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
            type: 'text',
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
          name: 'fk__item_text_attribute__item_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item',
        }, {
          name: 'fk__item_text_attribute__text_attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['text_attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'text_attribute',
        }],
        indices: [{
          name: 'IDX__item_text_attribute__item_id',
          columnNames: ['item_id'],
        }, {
          name: 'IDX__item_text_attribute__text_attribute_id',
          columnNames: ['text_attribute_id'],
        }, {
          name: 'IDX__item_text_attribute__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item_text_attribute');
    await queryRunner.dropTable('text_attribute');
  }
}
