import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { ManyToOneField } from '../common/many-to-one-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { Domain09 } from '../domain-09/domain-09.entity';
import { Domain09ById } from '../domain-09/query/domain-09-by-id.type';

@Entity()
@ObjectType({ implements: [MetaEntity, Domain09ById] })
export class Domain10 extends MetaEntity {
  @ColumnField({ type: 'uuid' })
  domain09Id!: string;
  @ManyToOneField(() => Domain09, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  domain09?: Domain09;

  @ColumnField({ type: 'int', nullable: true, comment: 'domain1001' })
  domain1001?: Maybe<number>;
}
