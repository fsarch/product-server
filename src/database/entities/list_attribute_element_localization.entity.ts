import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'list_attribute_element_localization',
})
export class ListAttributeElementLocalization {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__list_attribute_element_localization',
  })
  id: string;

  @Column({
    name: 'list_attribute_element_id',
    type: 'uuid',
  })
  listAttributeElementId: string;

  @Column({
    name: 'localization_id',
    type: 'uuid',
  })
  localizationId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 2048
  })
  name: string;

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
