import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain5Input } from './create-domain-5.input';

@InputType()
export class UpdateDomain5Input extends OmitType(
  PartialType(CreateDomain5Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
