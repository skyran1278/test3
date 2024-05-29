import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { OneToManyField } from '../common/one-to-many-field.decorator';
import { Domain0009 } from '../domain-0009/domain-0009.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0008 extends MetaEntity {
  @OneToManyField(() => Domain0009, (item) => item.domain0008, {
    cascade: true,
    comment: 'OneToMany',
  })
  domain0009s?: Domain0009[];

  @ColumnField({ type: 'int', nullable: true, comment: 'domain0008001' })
  domain0008001?: Maybe<number>;
}
