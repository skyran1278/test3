import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0021 } from '../domain-0021.entity';

@ObjectType()
export class CreateDomain0021sOutput {
  @Field(() => [Domain0021])
  domain0021s!: Domain0021[];
}
