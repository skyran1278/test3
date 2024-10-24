import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BasicAuthService } from '../common/basic-auth.service';
import { CommonModule } from '../common/common.module';
import { TypedConfigService } from '../configuration/typed-config.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [TypedConfigService],
      useFactory: (configService: TypedConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),
    BullBoardModule.forRootAsync({
      imports: [ConfigModule, CommonModule],
      inject: [TypedConfigService, BasicAuthService],
      useFactory: (
        configService: TypedConfigService,
        basicAuthService: BasicAuthService,
      ) => {
        const username = configService.get('BULL_BOARD_USERNAME');
        const password = configService.get('BULL_BOARD_PASSWORD');

        return {
          route: '/queues',
          adapter: ExpressAdapter,
          middleware: basicAuthService.use({
            users: {
              [username]: password,
            },
          }),
        };
      },
    }),
  ],
  providers: [BasicAuthService],
  exports: [BasicAuthService],
})
export class QueueModule {}
