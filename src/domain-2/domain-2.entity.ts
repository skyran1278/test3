import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { OneToManyField } from 'src/common/one-to-many-field.decorator';
import { Domain3 } from 'src/domain-3/domain-3.entity';
import { Entity } from 'typeorm';

import { Domain2StatusEnum } from './domain-2-status.enum';

@Entity()
@ObjectType({ implements: MetaEntity })
export class Domain2 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain2001' })
  domain2001?: Maybe<number>;

  @ColumnField({
    type: 'enum',
    enum: Domain2StatusEnum,
    nullable: true,
    comment: 'status',
  })
  domain2002?: Maybe<Domain2StatusEnum>;

  @OneToManyField(() => Domain3, (item) => item.domain2, {
    cascade: true,
    comment: 'domain3s',
    nullable: true,
  })
  domain3s?: Domain3[];
}
