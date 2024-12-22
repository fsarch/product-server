import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'attribute',
})
export class Attribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__attribute',
  })
  id: string;

  @Column({
    name: 'name',
    length: '2048',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: '256',
  })
  externalId: string;

  @Column({
    name: 'attribute_type_id',
    type: 'uuid',
  })
  attributeTypeId: string;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
