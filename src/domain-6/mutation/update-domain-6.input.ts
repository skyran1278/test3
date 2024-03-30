import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain6Input } from './create-domain-6.input';

@InputType()
export class UpdateDomain6Input extends OmitType(
  PartialType(CreateDomain6Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
