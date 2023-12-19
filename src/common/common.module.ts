import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { RepoProxy } from 'src/common/repo.proxy';
import { UserModule } from 'src/user/user.module';

import { MetaEntityResolver } from './meta.resolver';
import { SecurityGuard } from './security/security.guard';

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
  providers: [
    RepoProxy,
    MetaEntityResolver,
    {
      provide: APP_GUARD,
      useClass: SecurityGuard,
    },
  ],
  exports: [RepoProxy],
})
export class CommonModule {}
