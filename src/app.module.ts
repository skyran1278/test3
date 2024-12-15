import { join } from 'path';

import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  InternalServerErrorException,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLFormattedError } from 'graphql';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { AlsMiddleware } from './als/als.middleware';
import { AlsModule } from './als/als.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditLogModule } from './audit-log/audit-log.module';
import { CommonModule } from './common/common.module';
import { getDataSourceOptions } from './common/data-source-options';
import { ConfigurationModule } from './configuration/configuration.module';
import { EnvironmentEnum } from './configuration/environment.enum';
import { TypedConfigService } from './configuration/typed-config.service';
import { Domain01Module } from './domain-01/domain-01.module';
import { Domain03Module } from './domain-03/domain-03.module';
import { Domain08Module } from './domain-08/domain-08.module';
import { Domain09Module } from './domain-09/domain-09.module';
import { Domain10Module } from './domain-10/domain-10.module';
import { Domain15Module } from './domain-15/domain-15.module';
import { Domain21Module } from './domain-21/domain-21.module';
import { Domain22Module } from './domain-22/domain-22.module';
import { Domain24Module } from './domain-24/domain-24.module';
import { Domain25Module } from './domain-25/domain-25.module';
import { CustomHttpExceptionBody } from './error/custom.error';
import { ErrorModule } from './error/error.module';
import { HealthModule } from './health/health.module';
import { PermissionModule } from './permission/permission.module';
import { QueueModule } from './queue/queue.module';
import { RoleModule } from './role/role.module';
import { SecurityModule } from './security/security.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [TypedConfigService],
      useFactory: (configService: TypedConfigService) => ({
        ...getDataSourceOptions(),

        logging: !!configService.get('DB_LOGGING'),
        migrationsRun: !!configService.get('DB_MIGRATIONS_RUN'),

        // every entity registered through the forFeature() method will be automatically added to the entities array of the configuration object.
        autoLoadEntities: true,
      }),
      dataSourceFactory(options) {
        if (!options) {
          throw new InternalServerErrorException(
            'Invalid options passed to dataSourceFactory.',
          );
        }

        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [TypedConfigService],
      useFactory: (configService: TypedConfigService): ApolloDriverConfig => {
        const plugins =
          configService.get('GRAPHQL_SERVER') === EnvironmentEnum.PRODUCTION
            ? [ApolloServerPluginLandingPageProductionDefault()]
            : [ApolloServerPluginLandingPageLocalDefault()];

        return {
          autoSchemaFile: {
            path: join(process.cwd(), 'src/schema.gql'),
          },
          sortSchema: true,
          playground: false,
          plugins,
          formatError(
            formattedError: GraphQLFormattedError,
          ): GraphQLFormattedError {
            const originalError = formattedError.extensions
              ?.originalError as CustomHttpExceptionBody;
            return {
              ...formattedError,
              extensions: {
                ...formattedError.extensions,
                reason: originalError?.reason,
                detail: originalError?.detail,
              },
            };
          },
        };
      },
    }),
    QueueModule,
    AlsModule,
    AuditLogModule,
    ConfigurationModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    ErrorModule,
    HealthModule,
    UserModule,
    SecurityModule,
    Domain01Module,
    Domain03Module,
    Domain08Module,
    Domain09Module,
    Domain10Module,
    Domain15Module,
    Domain21Module,
    Domain22Module,
    Domain24Module,
    Domain25Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // bind the middleware,
    consumer
      .apply(AlsMiddleware)
      // and register it for all routes (in case of Fastify use '(.*)')
      .forRoutes('*');
  }
}
