import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { ManyToOneField } from '../common/many-to-one-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { Domain0009 } from '../domain-0009/domain-0009.entity';
import { Domain0009ById } from '../domain-0009/dto/domain-0009-by-id.type';

@Entity()
@ObjectType({ implements: [MetaEntity, Domain0009ById] })
export class Domain0010 extends MetaEntity {
  @ColumnField({ type: 'uuid' })
  domain0009Id!: string;
  @ManyToOneField(() => Domain0009, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  domain0009?: Domain0009;

  @ColumnField({ type: 'int', nullable: true, comment: 'domain0010001' })
  domain0010001?: Maybe<number>;
}
