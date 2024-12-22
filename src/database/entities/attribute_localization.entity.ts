import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'attribute_localization',
})
export class AttributeLocalization {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__attribute_localization',
  })
  id: string;

  @Column({
    name: 'attribute_id',
    type: 'uuid',
  })
  attributeId: string;

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

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
