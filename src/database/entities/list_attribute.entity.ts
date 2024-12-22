import {
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'list_attribute',
})
export class ListAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__list_attribute',
  })
  id: string;
}
