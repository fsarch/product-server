import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';
import { AttributeType } from "../../constants/attribute-type.enum.js";

export class LinkAttribute1762685222868 implements MigrationInterface {
  name = 'LinkAttribute1762685222868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region LinkAttribute
    await queryRunner.createTable(
      new Table({
        name: 'link_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__link_attribute',
          },
          {
            name: 'item_type_id',
            type: 'uuid',
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
        }, {
          name: 'fk__item_type__id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_type_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item_type',
        }],
      }),
    );
    // endregion

    // region ItemLinkAttribute
    await queryRunner.createTable(
      new Table({
        name: 'item_link_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item_link_attribute',
          },
          {
            name: 'item_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'link_attribute_id',
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
          name: 'fk__item_link_attribute__item_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item',
        }, {
          name: 'fk__item_link_attribute__link_attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['link_attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'link_attribute',
        }],
        indices: [{
          name: 'IDX__item_link_attribute__item_id',
          columnNames: ['item_id'],
        }, {
          name: 'IDX__item_link_attribute__link_attribute_id',
          columnNames: ['link_attribute_id'],
        }, {
          name: 'IDX__item_link_attribute__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion

    // region ItemLinkAttributeElement
    await queryRunner.createTable(
      new Table({
        name: 'item_link_attribute_element',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__item_link_attribute_element',
          },
          {
            name: 'item_link_attribute_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'linked_item_id',
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
          name: 'fk__item_link_attribute_element__item_link_attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['item_link_attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item_link_attribute',
        }, {
          name: 'fk__item_link_attribute_element__linked_item_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['linked_item_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'item',
        }],
        indices: [{
          name: 'IDX__item_link_attribute_element__item_link_attribute_id',
          columnNames: ['item_link_attribute_id'],
        }, {
          name: 'IDX__item_link_attribute_element__linked_item_id',
          columnNames: ['linked_item_id'],
        }, {
          name: 'IDX__item_link_attribute_element__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion

    await queryRunner.manager.insert('attribute_type', {
      id: AttributeType.LINK,
      name: 'Link',
      externalId: '$system.link',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('attribute_type', {
      id: AttributeType.LINK,
    });

    await queryRunner.dropTable('item_link_attribute_element');
    await queryRunner.dropTable('item_link_attribute');
    await queryRunner.dropTable('link_attribute');
  }
}
