import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  private static readonly log = new Logger('HttpExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    HttpExceptionFilter.log.error(exception.getResponse(), exception.stack);

    const type = host.getType();

    if (type === 'http') {
      return super.catch(exception, host);
    }

    return exception;
  }
}
