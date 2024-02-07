import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { FieldColumn } from 'src/common/field-column.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: MetaEntity })
export class Domain1 extends MetaEntity {
  @FieldColumn({ type: 'int', nullable: true, comment: 'domain1001' })
  domain1001?: Maybe<number>;
}
