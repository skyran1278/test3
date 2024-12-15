import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain15Input } from './create-domain-15.input';

@InputType()
export class UpdateDomain15Input extends OmitType(
  PartialType(CreateDomain15Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
