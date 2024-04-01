import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0002 } from '../domain-0002.entity';

@ObjectType()
export class UpdateDomain0002sOutput {
  @Field(() => [Domain0002])
  domain0002s!: Domain0002[];
}
