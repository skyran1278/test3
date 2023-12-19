import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { MetaEntity } from 'src/common/meta.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: MetaEntity })
export class Domain1 extends MetaEntity {
  @Field(() => Int, { description: 'domain1001', nullable: true })
  @Column({ type: 'int', nullable: true, comment: 'domain1001' })
  domain1001?: Maybe<number>;
}
