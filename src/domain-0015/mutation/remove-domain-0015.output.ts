import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0015 } from '../domain-0015.entity';

@ObjectType()
export class RemoveDomain0015Output {
  @Field(() => Domain0015)
  domain0015!: Domain0015;
}
