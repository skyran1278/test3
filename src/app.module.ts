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
import { Domain0001Module } from './domain-0001/domain-0001.module';
import { Domain0003Module } from './domain-0003/domain-0003.module';
import { Domain0008Module } from './domain-0008/domain-0008.module';
import { Domain0009Module } from './domain-0009/domain-0009.module';
import { Domain0010Module } from './domain-0010/domain-0010.module';
import { Domain0015Module } from './domain-0015/domain-0015.module';
import { Domain0021Module } from './domain-0021/domain-0021.module';
import { Domain0024Module } from './domain-0024/domain-0024.module';
import { Domain0025Module } from './domain-0025/domain-0025.module';
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
    Domain0001Module,
    Domain0003Module,
    Domain0008Module,
    Domain0009Module,
    Domain0010Module,
    Domain0015Module,
    Domain0021Module,
    Domain0024Module,
    Domain0025Module,
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
