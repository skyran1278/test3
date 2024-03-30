import { ObjectType } from '@nestjs/graphql';
import Decimal from 'decimal.js';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { OneToManyField } from 'src/common/one-to-many-field.decorator';
import { Domain3 } from 'src/domain-3/domain-3.entity';
import { Entity } from 'typeorm';

import { Domain2StatusEnum } from './domain-2-status.enum';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain2 extends MetaEntity {
  @ColumnField({ type: 'boolean', nullable: true, comment: 'boolean' })
  domain2001?: Maybe<boolean>;

  @ColumnField({
    type: 'int',
    nullable: true,
    comment: 'int',
  })
  domain2002?: Maybe<number>;

  @ColumnField({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: 'string',
  })
  domain2003?: Maybe<string>;

  @ColumnField({ type: 'date', nullable: true, comment: 'date' })
  domain2004?: Maybe<Date>;

  @ColumnField({
    type: 'decimal',
    nullable: true,
    comment: 'decimal',
  })
  domain2005?: Maybe<Decimal>;

  @ColumnField({
    type: 'enum',
    enum: Domain2StatusEnum,
    nullable: true,
    comment: 'enum',
  })
  domain2006?: Maybe<Domain2StatusEnum>;

  @ColumnField({
    type: 'int',
    array: true,
    nullable: true,
    comment: 'Array<int>',
  })
  domain2011?: Maybe<number[]>;

  @OneToManyField(() => Domain3, (item) => item.domain2, {
    cascade: true,
    comment: 'OneToMany',
    nullable: true,
  })
  domain3s?: Domain3[];
}
