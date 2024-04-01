import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0005Input } from './create-domain-0005.input';

@InputType()
export class UpdateDomain0005Input extends OmitType(
  PartialType(CreateDomain0005Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
