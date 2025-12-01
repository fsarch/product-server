import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'link_attribute',
})
export class LinkAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__link_attribute',
  })
  id: string;

  @Column({
    name: 'item_type_id',
    type: 'uuid',
  })
  item_type_id: string | null;
}
