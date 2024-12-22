import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'item_json_attribute',
})
export class ItemJsonAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__item_json_attribute',
  })
  id: string;

  @Column({
    name: 'item_id',
    type: 'uuid',
  })
  itemId: string;

  @Column({
    name: 'json_attribute_id',
    type: 'uuid',
  })
  jsonAttributeId: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: 256,
  })
  externalId: string;

  @Column({
    name: 'value',
    type: 'jsonb',
  })
  value: unknown;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
