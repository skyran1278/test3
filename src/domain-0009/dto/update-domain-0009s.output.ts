import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0009 } from '../domain-0009.entity';

@ObjectType()
export class UpdateDomain0009sOutput {
  @Field(() => [Domain0009])
  domain0009s!: Domain0009[];
}
