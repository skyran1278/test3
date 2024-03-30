import { ObjectType } from '@nestjs/graphql';
import Decimal from 'decimal.js';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Entity } from 'typeorm';
import { Domain6StatusEnum } from './domain-6-status.enum';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain6 extends MetaEntity {
  @ColumnField({ type: 'boolean', nullable: true, comment: 'boolean' })
  domain6001?: Maybe<boolean>;

  @ColumnField({
    type: 'int',
    nullable: true,
    comment: 'int',
  })
  domain6002?: Maybe<number>;

  @ColumnField({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: 'string',
  })
  domain6003?: Maybe<string>;

  @ColumnField({ type: 'date', nullable: true, comment: 'date' })
  domain6004?: Maybe<Date>;

  @ColumnField({
    type: 'decimal',
    nullable: true,
    comment: 'decimal',
  })
  domain6005?: Maybe<Decimal>;

  @ColumnField({
    type: 'enum',
    enum: Domain6StatusEnum,
    nullable: true,
    comment: 'enum',
  })
  domain6006?: Maybe<Domain6StatusEnum>;

  @ColumnField({ type: 'jsonb', comment: 'jsonb', nullable: true })
  domain6007?: Maybe<Record<string, unknown>>;

  @ColumnField({ type: 'json', comment: 'json', nullable: true })
  domain6008?: Maybe<Record<string, unknown>>;

  @ColumnField({
    type: 'int',
    array: true,
    nullable: true,
    comment: 'Array<int>',
  })
  domain6011?: Maybe<number[]>;
}
