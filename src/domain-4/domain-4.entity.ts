import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain4 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain4001' })
  domain4001?: Maybe<number>;
}
