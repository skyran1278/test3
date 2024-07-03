import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0021 } from '../domain-0021.entity';

@ObjectType()
export class CreateDomain0021Output {
  @Field(() => Domain0021)
  domain0021!: Domain0021;
}
