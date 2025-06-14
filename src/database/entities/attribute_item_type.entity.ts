import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attribute } from "./attribute.entity.js";

@Entity({
  name: 'attribute_item_type',
})
export class AttributeItemType {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__attribute_item_type',
  })
  id: string;

  @Column({
    name: 'attribute_id',
    type: 'uuid',
  })
  attributeId: string;

  attribute?: Attribute;

  @Column({
    name: 'item_type_id',
    type: 'uuid',
  })
  itemTypeId: string;

  @Column({
    name: 'is_required',
    type: 'boolean',
  })
  isRequired: boolean;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
