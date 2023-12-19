import { Field, InputType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

@InputType()
export class UserWhereInput {
  @Field(() => String, { nullable: true, description: 'Example Field' })
  id?: Maybe<string>;
}
