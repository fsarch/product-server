import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'item_number_attribute',
})
export class ItemNumberAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__item_number_attribute',
  })
  id: string;

  @Column({
    name: 'item_id',
    type: 'uuid',
  })
  itemId: string;


  @Column({
    name: 'number_attribute_id',
    type: 'uuid',
  })
  numberAttributeId: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: 256,
  })
  externalId: string;

  @Column({
    name: 'value',
    type: 'decimal',
  })
  value: number;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
