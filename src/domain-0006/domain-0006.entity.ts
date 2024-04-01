import { ObjectType } from '@nestjs/graphql';
import Decimal from 'decimal.js';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Entity } from 'typeorm';
import { Domain0006StatusEnum } from './domain-0006-status.enum';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0006 extends MetaEntity {
  @ColumnField({ type: 'boolean', nullable: true, comment: 'boolean' })
  domain0006001?: Maybe<boolean>;

  @ColumnField({
    type: 'int',
    nullable: true,
    comment: 'int',
  })
  domain0006002?: Maybe<number>;

  @ColumnField({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: 'string',
  })
  domain0006003?: Maybe<string>;

  @ColumnField({ type: 'date', nullable: true, comment: 'date' })
  domain0006004?: Maybe<Date>;

  @ColumnField({
    type: 'decimal',
    nullable: true,
    comment: 'decimal',
  })
  domain0006005?: Maybe<Decimal>;

  @ColumnField({
    type: 'enum',
    enum: Domain0006StatusEnum,
    nullable: true,
    comment: 'enum',
  })
  domain0006006?: Maybe<Domain0006StatusEnum>;

  @ColumnField({ type: 'jsonb', comment: 'jsonb', nullable: true })
  domain0006007?: Maybe<Record<string, unknown>>;

  @ColumnField({ type: 'json', comment: 'json', nullable: true })
  domain0006008?: Maybe<Record<string, unknown>>;

  @ColumnField({
    type: 'int',
    array: true,
    nullable: true,
    comment: 'Array<int>',
  })
  domain0006011?: Maybe<number[]>;
}
