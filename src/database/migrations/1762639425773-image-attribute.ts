import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';

export class ImageAttribute1762639425773 implements MigrationInterface {
  name = 'ImageAttribute1762639425773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region ImageAttribute
    await queryRunner.createTable(
      new Table({
        name: 'image_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__image_attribute',
          },
          {
            name: 'image_server_url',
            type: 'varchar',
            length: '2048',
            isNullable: false,
          },
        ],
        foreignKeys: [{
          name: 'fk__image_attribute__id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'attribute',
        }],
      }),
    );
    // endregion

    // region ItemImageAttribute
    await queryRunner.createTable(
      new Table({
        name: 'item_image_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item_image_attribute',
          },
          {
            name: 'item_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'image_attribute_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'image_id',
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
          name: 'fk__item_image_attribute__item_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item',
        }, {
          name: 'fk__item_image_attribute__image_attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['image_attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'image_attribute',
        }],
        indices: [{
          name: 'IDX__item_image_attribute__item_id',
          columnNames: ['item_id'],
        }, {
          name: 'IDX__item_image_attribute__image_attribute_id',
          columnNames: ['image_attribute_id'],
        }, {
          name: 'IDX__item_image_attribute__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item_image_attribute');
    await queryRunner.dropTable('image_attribute');
  }
}
