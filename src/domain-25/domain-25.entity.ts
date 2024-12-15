import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { ManyToManyField } from '../common/many-to-many-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { Domain24 } from '../domain-24/domain-24.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain25 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain2501' })
  domain2501?: Maybe<number>;

  @ManyToManyField(() => Domain24, (item) => item.domain25s)
  domain24s?: Domain24[];
}
