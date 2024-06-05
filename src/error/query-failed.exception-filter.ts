import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { CustomError } from './custom.error';
import { HttpExceptionFilter } from './http.exception-filter';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter {
  constructor(private readonly httpExceptionFilter: HttpExceptionFilter) {}

  catch(
    exception: QueryFailedError & { code: string; detail: string },
    host: ArgumentsHost,
  ) {
    const error = new CustomError({
      message: exception.message,
      httpErrorCode: HttpStatus.CONFLICT,
      detail: {
        code: exception.code,
        detail: exception.detail,
        query: exception.query,
        parameters: exception.parameters,
      },
      cause: exception,
    });

    return this.httpExceptionFilter.catch(error, host);
  }
}
