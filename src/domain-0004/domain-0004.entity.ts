import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { OneToManyField } from 'src/common/one-to-many-field.decorator';
import { Domain0005 } from 'src/domain-0005/domain-0005.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0004 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0004001' })
  domain0004001?: Maybe<number>;

  @OneToManyField(() => Domain0005, (item) => item.domain0004, {
    comment: 'OneToMany',
    nullable: true,
  })
  domain0005s?: Domain0005[];
}
