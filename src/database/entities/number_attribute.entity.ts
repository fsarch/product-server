import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'number_attribute',
})
export class NumberAttribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__number_attribute',
  })
  id: string;

  @Column({
    name: 'min_value',
    type: 'decimal',
  })
  minValue: number;

  @Column({
    name: 'max_value',
    type: 'decimal',
  })
  maxValue: number;

  @Column({
    name: 'decimals',
    type: 'integer',
  })
  decimals: number;
}
