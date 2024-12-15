import { Field, ObjectType } from '@nestjs/graphql';

import { Domain21 } from '../domain-21.entity';

@ObjectType()
export class CreateDomain21sOutput {
  @Field(() => [Domain21])
  domain21s!: Domain21[];
}
