import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinColumn, OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TextAttribute } from "./text_attribute.entity.js";
import { ImageAttribute } from "./image_attribute.entity.js";

@Entity({
  name: 'attribute',
})
export class Attribute {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__attribute',
  })
  id: string;

  @Column({
    name: 'catalog_id',
    length: 'uuid',
    nullable: false,
  })
  catalogId: string;

  @Column({
    name: 'name',
    length: '2048',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: '256',
  })
  externalId: string;

  @Column({
    name: 'attribute_type_id',
    type: 'uuid',
  })
  attributeTypeId: string;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}

@Entity({
  name: 'attribute',
})
export class CompleteAttribute extends Attribute {
  @OneToOne(() => TextAttribute, { cascade: true })
  @JoinColumn({ name: 'id' })
  textAttribute: TextAttribute;

  @OneToOne(() => ImageAttribute, { cascade: true })
  @JoinColumn({ name: 'id' })
  imageAttribute: ImageAttribute;
}

