import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'item_link_attribute',
})
export class ItemLinkAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__item_link_attribute',
  })
  id: string;

  @Column({
    name: 'item_id',
    type: 'uuid',
  })
  itemId: string;

  @Column({
    name: 'link_attribute_id',
    type: 'uuid',
  })
  linkAttributeId: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: 256,
  })
  externalId: string;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
