import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariables } from 'src/configuration/environment-variables';

import { AlsModule } from '../als/als.module';
import { PermissionModule } from '../permission/permission.module';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { AuthorizationFactory } from './authorization.factory';
import { SecurityGuard } from './security.guard';
import { SecurityResolver } from './security.resolver';
import { SecurityService } from './security.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
    UserModule,
    AlsModule,
    PermissionModule,
  ],
  providers: [
    AuthorizationFactory,
    SecurityResolver,
    SecurityService,
    {
      provide: APP_GUARD,
      useClass: SecurityGuard,
    },
  ],
})
export class SecurityModule {}
