import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateDomain1Input } from './create-domain1.input';

@InputType()
export class UpdateDomain1Input extends PartialType(CreateDomain1Input) {
  @Field(() => Int)
  id!: number;
}
