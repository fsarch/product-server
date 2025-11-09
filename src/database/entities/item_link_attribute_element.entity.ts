import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'item_link_attribute_element',
})
export class ItemLinkAttributeElement {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__item_link_attribute_element',
  })
  id: string;

  @Column({
    name: 'item_link_attribute_id',
    type: 'uuid',
  })
  itemLinkAttributeId: string;

  @Column({
    name: 'linked_item_id',
    type: 'uuid',
  })
  linkedItemId: string;

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
