import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'item_type',
})
export class ItemType {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__item_type',
  })
  id: string;

  @Column({
    name: 'catalog_id',
    type: 'uuid',
  })
  catalogId: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: '256',
  })
  externalId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: '2048',
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
