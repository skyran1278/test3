import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0012 } from '../domain-0012.entity';

@ObjectType()
export class CreateDomain0012Output {
  @Field(() => Domain0012)
  domain0012!: Domain0012;
}
