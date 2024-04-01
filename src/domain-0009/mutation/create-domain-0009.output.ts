import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0009 } from '../domain-0009.entity';

@ObjectType()
export class CreateDomain0009Output {
  @Field(() => Domain0009)
  domain0009!: Domain0009;
}
