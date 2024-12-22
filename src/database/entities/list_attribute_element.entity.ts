import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'list_attribute_element',
})
export class ListAttributeElement {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__list_attribute_element',
  })
  id: string;

  @Column({
    name: 'list_attribute_id',
    type: 'uuid',
  })
  listAttributeId: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: '256',
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
