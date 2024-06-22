import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { ManyToOneField } from '../common/many-to-one-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { OneToManyField } from '../common/one-to-many-field.decorator';
import { Domain0008 } from '../domain-0008/domain-0008.entity';
import { Domain0010 } from '../domain-0010/domain-0010.entity';
import { Domain0010sByDomain0009Id } from '../domain-0010/query/domain-0010s-by-domain-0009-id.type';

@Entity()
@ObjectType({ implements: [MetaEntity, Domain0010sByDomain0009Id] })
export class Domain0009 extends MetaEntity {
  @ColumnField({ type: 'uuid' })
  domain0008Id!: string;
  @ManyToOneField(() => Domain0008, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  domain0008?: Domain0008;

  @OneToManyField(() => Domain0010, (item) => item.domain0009, {
    cascade: true,
    comment: 'OneToMany',
  })
  domain0010s?: Domain0010[];

  @ColumnField({ type: 'int', nullable: true, comment: 'domain0009001' })
  domain0009001?: Maybe<number>;
}
