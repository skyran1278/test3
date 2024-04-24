import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class User extends MetaEntity {
  @ColumnField({ type: 'int', comment: 'user001' })
  user001!: number;

  @ColumnField({ type: 'int', comment: 'user002' })
  user002!: number;
}
