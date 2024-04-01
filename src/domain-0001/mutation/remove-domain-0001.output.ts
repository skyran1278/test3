import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType()
export class RemoveDomain0001Output {
  @Field(() => Domain0001)
  domain0001!: Domain0001;
}
