import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateDomain1Input {
  @Field(() => Int, { description: 'domain1001' })
  domain1001!: number;
}
