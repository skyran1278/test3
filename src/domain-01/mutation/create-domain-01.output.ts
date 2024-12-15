import { Field, ObjectType } from '@nestjs/graphql';

import { Domain01 } from '../domain-01.entity';

@ObjectType()
export class CreateDomain01Output {
  @Field(() => Domain01)
  domain01!: Domain01;
}
