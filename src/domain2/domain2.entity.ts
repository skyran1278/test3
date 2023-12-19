import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { MetaEntity } from 'src/common/meta.entity';
import { Domain1 } from 'src/domain1/domain1.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Domain2 extends MetaEntity {
  @Field(() => Int, { description: 'domain2001', nullable: true })
  @Column({ type: 'int', nullable: true })
  domain2001?: Maybe<number>;

  @Column({ type: 'uuid' })
  domain1Id!: string;
  @ManyToOne(() => Domain1, { onDelete: 'CASCADE' })
  domain1?: Domain1;
}
