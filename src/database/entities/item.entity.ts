import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'item',
})
export class Item {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__item',
  })
  id: string;

  @Column({
    name: 'catalog_id',
    type: 'uuid',
  })
  catalogId: string;

  @Column({
    name: 'item_type_id',
    type: 'uuid',
  })
  itemTypeId: string;

  @Column({
    name: 'parent_item_id',
    type: 'uuid',
  })
  parentItemId: string;

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
