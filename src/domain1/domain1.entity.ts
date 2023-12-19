import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { MetaEntity } from 'src/common/meta.entity';
import { Domain2 } from 'src/domain2/domain2.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType({ implements: MetaEntity })
export class Domain1 extends MetaEntity {
  @Field(() => Int, { description: 'domain1001', nullable: true })
  @Column({ type: 'int', nullable: true, comment: 'domain1001' })
  domain1001?: Maybe<number>;

  @Field(() => [Domain2], { description: 'domain2s', nullable: true })
  @OneToMany(() => Domain2, (domain2) => domain2.domain1, { cascade: true })
  domain2s?: Domain2[];
}
