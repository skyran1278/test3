import { Field, ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

@ObjectType()
export class ErrorType {
  @Field(() => Boolean, { nullable: true })
  customAuthenticationError?: Maybe<boolean>;

  @Field(() => Boolean, { nullable: true })
  validatorError?: Maybe<boolean>;

  @Field(() => Boolean, { nullable: true })
  unknownError?: Maybe<boolean>;

  @Field(() => Boolean, { nullable: true })
  queryFailedError?: Maybe<boolean>;

  @Field(() => Boolean, { nullable: true })
  typeORMError?: Maybe<boolean>;
}
