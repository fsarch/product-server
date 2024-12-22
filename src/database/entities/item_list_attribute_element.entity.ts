import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'item_list_attribute_element',
})
export class ItemListAttributeElement {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__item_list_attribute_element',
  })
  id: string;

  @Column({
    name: 'item_list_attribute_id',
    type: 'uuid',
  })
  itemListAttributeId: string;

  @Column({
    name: 'list_attribute_element_id',
    type: 'uuid',
  })
  listAttributeElementId: string;

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
