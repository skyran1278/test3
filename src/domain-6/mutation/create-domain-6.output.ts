import { Field, ObjectType } from '@nestjs/graphql';

import { Domain6 } from '../domain-6.entity';

@ObjectType()
export class CreateDomain6Output {
  @Field(() => Domain6)
  domain6!: Domain6;
}
