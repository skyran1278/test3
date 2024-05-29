import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0008 } from '../domain-0008.entity';

@ObjectType()
export class RemoveDomain0008Output {
  @Field(() => Domain0008)
  domain0008!: Domain0008;
}
