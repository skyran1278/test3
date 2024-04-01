import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0011 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0011001' })
  domain0011001?: Maybe<number>;
}
