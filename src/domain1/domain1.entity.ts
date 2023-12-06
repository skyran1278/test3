import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Domain1 {
  @Field(() => Int, { description: 'id' })
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int, { description: 'domain1001', nullable: true })
  @Column({ type: 'int', nullable: true })
  domain1001?: Maybe<number>;
}
