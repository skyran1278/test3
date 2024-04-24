import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { OneToManyField } from '../common/one-to-many-field.decorator';
import { Domain0006 } from '../domain-0006/domain-0006.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0005 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0005001' })
  domain0005001?: Maybe<number>;

  @OneToManyField(() => Domain0006, (item) => item.domain0005, {
    comment: 'OneToMany',
    nullable: true,
  })
  domain0006s?: Domain0006[];
}
