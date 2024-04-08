import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0009Input {
  @Field(() => ID)
  id!: string;
}
