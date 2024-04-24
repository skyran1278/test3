import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { ManyToOneField } from '../common/many-to-one-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { Domain0006 } from '../domain-0006/domain-0006.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0007 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0007001' })
  domain0007001?: Maybe<number>;

  @ColumnField({ type: 'uuid', comment: 'domain0006Id' })
  domain0006Id!: string;
  @ManyToOneField(() => Domain0006, {
    comment: 'ManyToOne',
    orphanedRowAction: 'delete',
  })
  domain0006?: Domain0006;
}
