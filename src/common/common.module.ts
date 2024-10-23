import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AlsModule } from '../als/als.module';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { RepoProxy } from '../common/repo.proxy';
import { TypedConfigService } from '../configuration/typed-config.service';
import { UserModule } from '../user/user.module';
import { LoggingInterceptor } from './logging.interceptor';
import { MetaEntityResolver } from './meta-entity.resolver';
import { MetaEntitySubscriber } from './meta-entity.subscriber';
import { WinstonLogger } from './winston-logger.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [TypedConfigService],
      useFactory: (configService: TypedConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    AlsModule,
    UserModule,
    AuditLogModule,
  ],
  providers: [
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
      useClass: LoggingInterceptor,
    },
    MetaEntityResolver,
    RepoProxy,
    WinstonLogger,
    MetaEntitySubscriber,
  ],
  exports: [RepoProxy, WinstonLogger],
})
export class CommonModule {}
