import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { ManyToOneField } from '../common/many-to-one-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { OneToManyField } from '../common/one-to-many-field.decorator';
import { Domain08 } from '../domain-08/domain-08.entity';
import { Domain10 } from '../domain-10/domain-10.entity';
import { Domain10sByDomain09Id } from '../domain-10/query/domain-10s-by-domain-09-id.type';

@Entity()
@ObjectType({ implements: [MetaEntity, Domain10sByDomain09Id] })
export class Domain09 extends MetaEntity {
  @ColumnField({ type: 'uuid' })
  domain08Id!: string;
  @ManyToOneField(() => Domain08, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  domain08?: Domain08;

  @OneToManyField(() => Domain10, (item) => item.domain09, {
    cascade: true,
    comment: 'OneToMany',
  })
  domain10s?: Domain10[];

  @ColumnField({ type: 'int', nullable: true, comment: 'domain0901' })
  domain0901?: Maybe<number>;
}
