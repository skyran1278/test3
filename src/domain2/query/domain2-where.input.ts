import { Field, InputType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

@InputType()
export class Domain2WhereInput {
  @Field(() => String, { nullable: true, description: 'Example Field' })
  id?: Maybe<string>;
}
