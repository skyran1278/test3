import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0008 } from '../domain-0008.entity';

@ObjectType()
export class UpdateDomain0008sOutput {
  @Field(() => [Domain0008])
  domain0008s!: Domain0008[];
}
