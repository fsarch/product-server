import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'localization',
})
export class Localization {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__localization',
  })
  id: string;

  @Column({
    name: 'name',
    length: '512',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'country_code',
    type: 'varchar',
    length: '16',
  })
  countryCode: string;

  @Column({
    name: 'language_code',
    type: 'varchar',
    length: '16',
  })
  languageCode: string;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
