import { ObjectType } from '@nestjs/graphql';
import Decimal from 'decimal.js';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { sql } from '../common/sql';
import { VirtualColumnField } from '../common/virtual-column-field.decorator';
import { Domain03StatusEnum } from './domain-03-status.enum';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain03 extends MetaEntity {
  @ColumnField({ type: 'boolean', nullable: true, comment: 'boolean' })
  domain0301?: Maybe<boolean>;

  @ColumnField({
    type: 'int',
    nullable: true,
    comment: 'int',
  })
  domain0302?: Maybe<number>;

  @ColumnField({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: 'varchar',
  })
  domain0303?: Maybe<string>;

  @ColumnField({ type: 'date', nullable: true, comment: 'date' })
  domain0304?: Maybe<string>;

  @ColumnField({
    type: 'decimal',
    nullable: true,
    comment: 'decimal',
  })
  domain0305?: Maybe<Decimal>;

  @ColumnField({
    type: 'enum',
    enum: Domain03StatusEnum,
    nullable: true,
    comment: 'enum',
  })
  domain0306?: Maybe<Domain03StatusEnum>;

  @ColumnField({ type: 'jsonb', comment: 'jsonb', nullable: true })
  domain0307?: Maybe<Record<string, unknown>>;

  @ColumnField({ type: 'json', comment: 'json', nullable: true })
  domain0308?: Maybe<Record<string, unknown>>;

  @VirtualColumnField({
    type: 'int',
    comment: 'VirtualColumn',
    query: (alias) => sql`
      SELECT
        "domain0302"
      FROM
        "domain03"
      WHERE
        "id" = ${alias}.id
    `,
  })
  domain0309?: Maybe<number>;

  @ColumnField({
    type: 'int',
    array: true,
    nullable: true,
    comment: 'Array<int>',
  })
  domain0311?: Maybe<number[]>;

  @ColumnField({ type: 'timestamp', nullable: true, comment: 'timestamp' })
  domain0312?: Maybe<Date>;

  @ColumnField({
    type: 'timestamp with time zone',
    nullable: true,
    comment: 'timestamp with time zone',
  })
  domain0313?: Maybe<Date>;

  @ColumnField({
    type: 'timestamp without time zone',
    nullable: true,
    comment: 'timestamp without time zone (same as timestamp)',
  })
  domain0314?: Maybe<Date>;
}
