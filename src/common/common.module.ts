import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { RepoProxy } from '../common/repo.proxy';
import { UserModule } from '../user/user.module';
import { MetaEntityResolver } from './meta.resolver';
import { WinstonLogger } from './winston-logger.service';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  providers: [RepoProxy, MetaEntityResolver, WinstonLogger],
  exports: [RepoProxy, WinstonLogger],
})
export class CommonModule {}
