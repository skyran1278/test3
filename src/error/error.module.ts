import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ErrorController } from './error.controller';
import { HttpExceptionFilter } from './http.exception-filter';
import { QueryFailedExceptionFilter } from './query-failed.exception-filter';
import { UnknownExceptionFilter } from './unknown.exception-filter';

@Module({
  providers: [
    HttpExceptionFilter,
    /**
     * @see https://docs.nestjs.com/exception-filters#catch-everything
     * When combining an exception filter that catches everything with a filter that is bound to a specific type,
     * the "Catch anything" filter should be declared first to allow the specific filter to correctly handle the bound type.
     */
    {
      provide: APP_FILTER,
      useClass: UnknownExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useExisting: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
  ],
  controllers: [ErrorController],
})
export class ErrorModule {}
