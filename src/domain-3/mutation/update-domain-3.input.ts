import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain3Input } from './create-domain-3.input';

@InputType()
export class UpdateDomain3Input extends OmitType(
  PartialType(CreateDomain3Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
