import { Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CustomAuthenticationError } from './custom-authentication.error';
import { ErrorType } from './error.type';
import { ValidatorError } from './validator.error';

/**
 * Error resolver for testing error handling
 */
@Resolver(() => ErrorType)
export class ErrorResolver {
  @Query(() => ErrorType)
  error(): ErrorType {
    return new ErrorType();
  }

  @ResolveField(() => Boolean, { nullable: true })
  customAuthenticationError() {
    throw new CustomAuthenticationError();
  }

  @ResolveField(() => Boolean, { nullable: true })
  validatorError() {
    throw new ValidatorError();
  }

  @ResolveField(() => Boolean, { nullable: true })
  unknownError() {
    throw new Error();
  }

  @ResolveField(() => Boolean, { nullable: true })
  queryFailedError() {
    throw new Error('Query failed');
  }

  @ResolveField(() => Boolean, { nullable: true })
  typeORMError() {
    throw new Error('TypeORM error');
  }
}
