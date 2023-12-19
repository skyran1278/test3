import { Field, InputType, Int } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

@InputType()
export class CreateDomain2Input {
  @Field(() => Int, { description: 'domain2001', nullable: true })
  domain2001?: Maybe<number>;
}
