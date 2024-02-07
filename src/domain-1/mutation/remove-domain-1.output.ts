import { Field, ObjectType } from '@nestjs/graphql';

import { Domain1 } from '../domain-1.entity';

@ObjectType()
export class RemoveDomain1Output {
  @Field(() => Domain1)
  domain1!: Domain1;
}
