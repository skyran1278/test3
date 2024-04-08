import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0015Input {
  @Field(() => ID)
  id!: string;
}
