import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain15 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain1501' })
  domain1501?: Maybe<number>;
}
