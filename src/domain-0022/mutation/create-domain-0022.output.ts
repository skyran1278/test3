import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0022 } from '../domain-0022.entity';

@ObjectType()
export class CreateDomain0022Output {
  @Field(() => Domain0022)
  domain0022!: Domain0022;
}
