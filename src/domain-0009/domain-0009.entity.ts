import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { OneToManyField } from '../common/one-to-many-field.decorator';
import { Domain0010 } from '../domain-0010/domain-0010.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0009 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0009001' })
  domain0009001?: Maybe<number>;

  @OneToManyField(() => Domain0010, (item) => item.domain0009, {
    cascade: true,
    comment: 'OneToMany',
    nullable: true,
  })
  domain0010s?: Domain0010[];
}
