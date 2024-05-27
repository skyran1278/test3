import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { QueryFailedExceptionsFilter } from './query-failed-exceptions.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionsFilter,
    },
  ],
})
export class ErrorModule {}
