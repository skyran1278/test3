import { Field, ObjectType } from '@nestjs/graphql';

import { Domain1 } from '../domain1.entity';

@ObjectType()
export class UpdateDomain1Output {
  @Field(() => Domain1)
  domain1!: Domain1;
}
