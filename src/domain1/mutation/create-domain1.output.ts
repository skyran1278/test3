import { Field, ObjectType } from '@nestjs/graphql';

import { Domain1 } from '../domain1.entity';

@ObjectType()
export class CreateDomain1Output {
  @Field(() => Domain1)
  domain1!: Domain1;
}
