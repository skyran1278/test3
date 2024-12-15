import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { OneToManyField } from '../common/one-to-many-field.decorator';
import { Domain09 } from '../domain-09/domain-09.entity';
import { Domain09sByDomain08Id } from '../domain-09/query/domain-09s-by-domain-08-id.type';

@Entity()
@ObjectType({ implements: [MetaEntity, Domain09sByDomain08Id] })
export class Domain08 extends MetaEntity {
  @OneToManyField(() => Domain09, (item) => item.domain08, {
    cascade: true,
    comment: 'OneToMany',
  })
  domain09s?: Domain09[];

  @ColumnField({ type: 'int', nullable: true, comment: 'domain0801' })
  domain0801?: Maybe<number>;
}
