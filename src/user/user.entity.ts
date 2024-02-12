import { ObjectType } from '@nestjs/graphql';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/dao/meta.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: MetaEntity })
export class User extends MetaEntity {
  @ColumnField({ type: 'int', comment: 'user001' })
  user001!: number;

  @ColumnField({ type: 'int', comment: 'user002' })
  user002!: number;
}
