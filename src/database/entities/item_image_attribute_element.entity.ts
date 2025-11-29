import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'item_image_attribute_element',
})
export class ItemImageAttributeElement {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__item_image_attribute_element',
  })
  id: string;

  @Column({
    name: 'item_image_attribute_id',
    type: 'uuid',
  })
  itemImageAttributeId: string;

  @Column({
    name: 'image_id',
    type: 'uuid',
  })
  imageId: string;

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
