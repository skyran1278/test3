import { Field, InputType, Int } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

@InputType()
export class CreateDomain1Input {
  @Field(() => Int, { description: 'domain1001', nullable: true })
  domain1001?: Maybe<number>;
}
