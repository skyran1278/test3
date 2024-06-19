import { Module } from '@nestjs/common';

import { AlsService, alsService } from './als.service';

/**
 * @see https://docs.nestjs.com/recipes/async-local-storage
 * @see https://github.com/Papooch/nestjs-cls
 */
@Module({
  providers: [
    {
      provide: AlsService,
      useValue: alsService,
    },
  ],
  exports: [AlsService],
})
export class AlsModule {}
