import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity, JoinTable } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { ManyToManyField } from '../common/many-to-many-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { Domain0025 } from '../domain-0025/domain-0025.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0024 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0024001' })
  domain0024001?: Maybe<number>;

  @ManyToManyField(() => Domain0025, (item) => item.domain0024s)
  @JoinTable()
  domain0025s?: Domain0025[];
}
