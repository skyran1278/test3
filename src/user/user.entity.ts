import { ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class User extends MetaEntity {
  @ColumnField({
    type: 'varchar',
    length: 255,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  hashedPassword!: string;
}
