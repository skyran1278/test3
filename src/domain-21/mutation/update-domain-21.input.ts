import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain21Input } from './create-domain-21.input';

@InputType()
export class UpdateDomain21Input extends OmitType(
  PartialType(CreateDomain21Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
