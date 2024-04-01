import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0011 } from '../domain-0011.entity';

@ObjectType()
export class UpdateDomain0011Output {
  @Field(() => Domain0011)
  domain0011!: Domain0011;
}
