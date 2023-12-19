import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MetaEntity } from 'src/common/meta.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: MetaEntity })
export class User extends MetaEntity {
  @Field(() => Int, { description: 'user001' })
  @Column({ type: 'int', comment: 'user001' })
  user001!: number;

  @Field(() => Int, { description: 'user002' })
  @Column({ type: 'int', comment: 'user002' })
  user002!: number;
}
