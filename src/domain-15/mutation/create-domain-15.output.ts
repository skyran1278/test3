import { Field, ObjectType } from '@nestjs/graphql';

import { Domain15 } from '../domain-15.entity';

@ObjectType()
export class CreateDomain15Output {
  @Field(() => Domain15)
  domain15!: Domain15;
}
