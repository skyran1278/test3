import { Module } from '@nestjs/common';

import { AlsService, als } from './als.service';

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
  ],
  exports: [AlsService],
})
export class AlsModule {}
