import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'json_attribute',
})
export class JsonAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__list_attribute',
  })
  id: string;

  @Column({
    name: 'schema',
    type: 'jsonb',
  })
  schema: unknown;
}
