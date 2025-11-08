import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'image_attribute',
})
export class ImageAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__image_attribute',
  })
  id: string;

  @Column({
    name: 'image_server_url',
    type: 'varchar',
    length: 2048,
  })
  imageServerUrl: string;
}
