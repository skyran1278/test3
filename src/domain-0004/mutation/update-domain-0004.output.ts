import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0004 } from '../domain-0004.entity';

@ObjectType()
export class UpdateDomain0004Output {
  @Field(() => Domain0004)
  domain0004!: Domain0004;
}
