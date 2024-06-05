import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';

import { CustomError } from './custom.error';
import { HttpExceptionFilter } from './http.exception-filter';

@Catch()
export class AllExceptionFilter {
  constructor(private readonly httpExceptionFilter: HttpExceptionFilter) {}

  catch(exception: Error, host: ArgumentsHost) {
    const error = new CustomError({
      message: 'Internal server error.',
      httpErrorCode: HttpStatus.INTERNAL_SERVER_ERROR,
      detail: {
        ...exception,
        name: exception.name,
        message: exception.message,
      },
      cause: exception,
    });

    return this.httpExceptionFilter.catch(error, host);
  }
}
