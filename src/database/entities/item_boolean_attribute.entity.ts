import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'item_boolean_attribute',
})
export class ItemBooleanAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__item_boolean_attribute',
  })
  id: string;

  @Column({
    name: 'item_id',
    type: 'uuid',
  })
  itemId: string;

  @Column({
    name: 'boolean_attribute_id',
    type: 'uuid',
  })
  booleanAttributeId: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: 256,
  })
  externalId: string;

  @Column({
    name: 'value',
    type: 'boolean',
  })
  value: boolean;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
