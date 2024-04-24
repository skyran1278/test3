import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0001 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0001001' })
  domain0001001?: Maybe<number>;
}
