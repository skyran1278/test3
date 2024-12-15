import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain15Input {
  @Field(() => ID)
  id!: string;
}
