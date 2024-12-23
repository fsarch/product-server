import {
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'boolean_attribute',
})
export class BooleanAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__boolean_attribute',
  })
  id: string;
}
