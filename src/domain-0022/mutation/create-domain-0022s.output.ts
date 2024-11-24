import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0022 } from '../domain-0022.entity';

@ObjectType()
export class CreateDomain0022sOutput {
  @Field(() => [Domain0022])
  domain0022s!: Domain0022[];
}
