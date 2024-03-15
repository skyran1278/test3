import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { CreateDomain3Input } from './create-domain-3.input';

@InputType()
export class UpdateDomain3Input extends PartialType(CreateDomain3Input) {
  @Field(() => ID)
  id!: string;
}
