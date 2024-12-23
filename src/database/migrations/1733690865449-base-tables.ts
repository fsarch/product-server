import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';
import { AttributeType } from "../../constants/attribute-type.enum.js";

export class BaseTables1720373216667 implements MigrationInterface {
  name = 'BaseTables1720373216667';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region Localization
    await queryRunner.createTable(
      new Table({
        name: 'localization',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__localization',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
          {
            name: 'country_code',
            type: 'varchar',
            length: '16',
            isNullable: false,
          },
          {
            name: 'language_code',
            type: 'varchar',
            length: '16',
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
      }),
    );
    // endregion

    // region Catalog
    await queryRunner.createTable(
      new Table({
        name: 'catalog',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__catalog',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '512',
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
      }),
    );
    // endregion

    // region AttributeType
    await queryRunner.createTable(
      new Table({
        name: 'attribute_type',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__attribute_type',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '2048',
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
        indices: [{
          name: 'IDX__attribute_type__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );

    await queryRunner.manager.insert('attribute_type', {
      id: AttributeType.NUMBER,
      name: 'Number',
      externalId: 'system.number',
    });

    await queryRunner.manager.insert('attribute_type', {
      id: AttributeType.TEXT,
      name: 'Text',
      externalId: 'system.text',
    });

    await queryRunner.manager.insert('attribute_type', {
      id: AttributeType.BOOLEAN,
      name: 'Boolean',
      externalId: 'system.boolean',
    });

    await queryRunner.manager.insert('attribute_type', {
      id: AttributeType.JSON,
      name: 'JSON',
      externalId: 'system.json',
    });

    await queryRunner.manager.insert('attribute_type', {
      id: AttributeType.LIST,
      name: 'List',
      externalId: 'system.list',
    });
    // endregion

    // region Attribute
    await queryRunner.createTable(
      new Table({
        name: 'attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__attribute',
          },
          {
            name: 'catalog_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'attribute_type_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '2048',
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
          name: 'fk__attribute__attribute_type_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['attribute_type_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'attribute_type',
        }, {
          name: 'fk__attribute__catalog_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['catalog_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'catalog',
        }],
        indices: [{
          name: 'IDX__attribute__catalog_id',
          columnNames: ['catalog_id'],
        }, {
          name: 'IDX__attribute__attribute_type_id',
          columnNames: ['attribute_type_id'],
        }, {
          name: 'IDX__attribute__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion

    // region AttributeLocalization
    await queryRunner.createTable(
      new Table({
        name: 'attribute_localization',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__attribute_localization',
          },
          {
            name: 'attribute_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'localization_id',
            type: 'uuid',
            isNullable: false,
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
          name: 'fk__attribute_localization__localization_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['localization_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'localization',
        }, {
          name: 'fk__attribute_localization__attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'attribute',
        }],
        indices: [{
          name: 'IDX__attribute_localization__attribute_id',
          columnNames: ['attribute_id'],
        }, {
          name: 'IDX__attribute_localization__localization_id',
          columnNames: ['localization_id'],
        }, {
          name: 'UX__attribute_localization__attribute_id__localization_id',
          columnNames: ['attribute_id', 'localization_id'],
          where: 'deletion_time IS NULL',
          isUnique: true,
        }],
      }),
    );
    // endregion

    // region JsonAttribute
    await queryRunner.createTable(
      new Table({
        name: 'json_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__json_attribute',
          },
          {
            name: 'schema',
            type: 'jsonb',
            isNullable: true,
          },
        ],
        foreignKeys: [{
          name: 'fk__json_attribute__id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'attribute',
        }],
      }),
    );
    // endregion

    // region ListAttribute
    await queryRunner.createTable(
      new Table({
        name: 'list_attribute',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__list_attribute',
          },
        ],
        foreignKeys: [{
          name: 'fk__list_attribute__id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'attribute',
        }],
      }),
    );
    // endregion

    // region ListAttributeElement
    await queryRunner.createTable(
      new Table({
        name: 'list_attribute_element',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__list_attribute_element',
          },
          {
            name: 'list_attribute_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'external_id',
            type: 'uuid',
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
          name: 'fk__list_attribute_element__list_attribute_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['list_attribute_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'list_attribute',
        }],
        indices: [{
          name: 'IDX__list_attribute_element__custom_list_id',
          columnNames: ['list_attribute_id'],
        }, {
          name: 'IDX__list_attribute_element__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion

    // region ListAttributeElementLocalization
    await queryRunner.createTable(
      new Table({
        name: 'list_attribute_element_localization',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__list_attribute_element_localization',
          },
          {
            name: 'list_attribute_element_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'localization_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '2048',
            isNullable: false,
          },
          {
            name: 'content',
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
          name: 'fk__list_attribute_element_localization__localization_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['localization_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'localization',
        }, {
          name: 'fk__list_attribute_element_localization__list_attribute_element_id',
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          columnNames: ['list_attribute_element_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'list_attribute_element',
        }],
        indices: [{
          name: 'IDX__list_attribute_element_localization__list_attribute_element_id',
          columnNames: ['list_attribute_element_id'],
        }, {
          name: 'IDX__list_attribute_element_localization__localization_id',
          columnNames: ['localization_id'],
        }, {
          name: 'UX__list_attribute_element_localization__list_attribute_element_id__localization_id',
          columnNames: ['list_attribute_element_id', 'localization_id'],
          where: 'deletion_time IS NULL',
          isUnique: true,
        }],
      }),
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('list_attribute_element_localization');
    await queryRunner.dropTable('list_attribute_element');
    await queryRunner.dropTable('list_attribute');
    await queryRunner.dropTable('attribute_localization');
    await queryRunner.dropTable('attribute');
    await queryRunner.dropTable('attribute_type');
    await queryRunner.dropTable('catalog');
    await queryRunner.dropTable('localization');
  }
}
