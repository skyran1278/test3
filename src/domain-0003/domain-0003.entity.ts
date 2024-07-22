import { ObjectType } from '@nestjs/graphql';
import Decimal from 'decimal.js';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { sql } from '../common/sql';
import { VirtualColumnField } from '../common/virtual-column-field.decorator';
import { Domain0003StatusEnum } from './domain-0003-status.enum';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0003 extends MetaEntity {
  @ColumnField({ type: 'boolean', nullable: true, comment: 'boolean' })
  domain0003001?: Maybe<boolean>;

  @ColumnField({
    type: 'int',
    nullable: true,
    comment: 'int',
  })
  domain0003002?: Maybe<number>;

  @ColumnField({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: 'varchar',
  })
  domain0003003?: Maybe<string>;

  @ColumnField({ type: 'date', nullable: true, comment: 'date' })
  domain0003004?: Maybe<Date>;

  @ColumnField({
    type: 'decimal',
    nullable: true,
    comment: 'decimal',
  })
  domain0003005?: Maybe<Decimal>;

  @ColumnField({
    type: 'enum',
    enum: Domain0003StatusEnum,
    nullable: true,
    comment: 'enum',
  })
  domain0003006?: Maybe<Domain0003StatusEnum>;

  @ColumnField({ type: 'jsonb', comment: 'jsonb', nullable: true })
  domain0003007?: Maybe<Record<string, unknown>>;

  @ColumnField({ type: 'json', comment: 'json', nullable: true })
  domain0003008?: Maybe<Record<string, unknown>>;

  @VirtualColumnField({
    type: 'int',
    comment: 'VirtualColumn',
    query: (alias) => sql`
      SELECT
        "domain0003002"
      FROM
        "domain0003"
      WHERE
        "id" = ${alias}.id
    `,
  })
  domain0003009?: Maybe<number>;

  @ColumnField({
    type: 'int',
    array: true,
    nullable: true,
    comment: 'Array<int>',
  })
  domain0003011?: Maybe<number[]>;
}
