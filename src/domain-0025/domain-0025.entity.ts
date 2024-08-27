import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { ManyToManyField } from '../common/many-to-many-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { Domain0024 } from '../domain-0024/domain-0024.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0025 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0025001' })
  domain0025001?: Maybe<number>;

  @ManyToManyField(() => Domain0024, (item) => item.domain0025s)
  domain0024s?: Domain0024[];
}
