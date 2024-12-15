import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity, JoinTable } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { ManyToManyField } from '../common/many-to-many-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { Domain25 } from '../domain-25/domain-25.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain24 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain2401' })
  domain2401?: Maybe<number>;

  @ManyToManyField(() => Domain25, (item) => item.domain24s)
  @JoinTable()
  domain25s?: Domain25[];
}
