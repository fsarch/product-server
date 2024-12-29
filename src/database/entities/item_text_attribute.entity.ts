import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'item_text_attribute',
})
export class ItemTextAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__item_text_attribute',
  })
  id: string;

  @Column({
    name: 'item_id',
    type: 'uuid',
  })
  itemId: string;

  @Column({
    name: 'text_attribute_id',
    type: 'uuid',
  })
  textAttributeId: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: 256,
  })
  externalId: string;

  @Column({
    name: 'value',
    type: 'text',
  })
  value: string;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
