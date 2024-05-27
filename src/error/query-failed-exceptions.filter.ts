import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

/**
 * @see https://github.com/nestjs/nest/issues/5958
 * @see https://github.com/nestjs/nest/pull/5972
 * - WS apps should use BaseWsExceptionFilter
 * - Microservices (including gRPC) should use BaseRpcExceptionFilter
 * - GraphQL shouldn't inherit from ANY class as it doesn't bring any benefit (there's no logic in the GQL exception filter, it simply re-throws an error down to the Apollo server
 */
@Catch(QueryFailedError)
export class QueryFailedExceptionsFilter extends BaseExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const type = host.getType();

    if (type === 'http') {
      return super.catch(exception, host);
    }

    throw exception;
  }
}
