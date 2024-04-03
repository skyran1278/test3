import { AsyncLocalStorage } from 'async_hooks';

import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AlsStore } from './als-store.interface';
import { AlsInterceptor } from './als.interceptor';
import { AlsService } from './als.service';

export const als = new AsyncLocalStorage<AlsStore>();

/**
 * @see https://docs.nestjs.com/recipes/async-local-storage
 * @see https://github.com/Papooch/nestjs-cls
 */
@Module({
  providers: [
    {
      provide: AlsService,
      useValue: als,
    },
    {
      /**
       * @see https://docs.nestjs.com/interceptors
       * When using this approach to perform dependency injection for the interceptor,
       * note that regardless of the module where this construction is employed,
       * the interceptor is, in fact, global.
       * Where should this be done?
       * Choose the module where the interceptor is defined.
       */
      provide: APP_INTERCEPTOR,
      useClass: AlsInterceptor,
    },
  ],
  exports: [AlsService],
})
export class AlsModule {}