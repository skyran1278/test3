import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0004 } from '../domain-0004.entity';

@ObjectType()
export class CreateDomain0004Output {
  @Field(() => Domain0004)
  domain0004!: Domain0004;
}
