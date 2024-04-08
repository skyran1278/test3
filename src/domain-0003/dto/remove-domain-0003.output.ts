import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0003 } from '../domain-0003.entity';

@ObjectType()
export class RemoveDomain0003Output {
  @Field(() => Domain0003)
  domain0003!: Domain0003;
}
