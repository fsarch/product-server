import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'text_attribute',
})
export class TextAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__text_attribute',
  })
  id: string;

  @Column({
    name: 'min_length',
    type: 'integer',
  })
  minLength: number;

  @Column({
    name: 'max_length',
    type: 'integer',
  })
  maxLength: number;
}
