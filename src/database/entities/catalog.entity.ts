import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'catalog',
})
export class Catalog {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__catalog',
  })
  id: string;

  @Column({
    name: 'name',
    length: '512',
    nullable: false,
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
