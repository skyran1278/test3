import { join } from 'path';

import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bullmq';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { AlsMiddleware } from './als/als.middleware';
import { AlsModule } from './als/als.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { Domain0001Module } from './domain-0001/domain-0001.module';
import { Domain0003Module } from './domain-0003/domain-0003.module';
import { Domain0005Module } from './domain-0005/domain-0005.module';
import { Domain0006Module } from './domain-0006/domain-0006.module';
import { Domain0007Module } from './domain-0007/domain-0007.module';
import { Domain0009Module } from './domain-0009/domain-0009.module';
import { Domain0010Module } from './domain-0010/domain-0010.module';
import { Domain0015Module } from './domain-0015/domain-0015.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        schema: configService.get('DB_SCHEMA'),
        autoLoadEntities: true, // every entity registered through the forFeature() method will be automatically added to the entities array of the configuration object.
        logging: !!configService.get('DB_LOGGING'),
        subscribers: [join(__dirname, '**', '*.subscriber.{ts,js}')],
        migrations: ['dist/migration/migrations/*.js'],
      }),
      dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ApolloDriverConfig => {
        const plugins =
          configService.get('GRAPHQL_SERVER') === 'production'
            ? [ApolloServerPluginLandingPageProductionDefault()]
            : [ApolloServerPluginLandingPageLocalDefault()];

        return {
          autoSchemaFile: {
            path: join(process.cwd(), 'src/schema.gql'),
          },
          sortSchema: true,
          playground: false,
          plugins,
        };
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
        },
      }),
    }),
    // AlsModule should be imported before any other module that uses als
    AlsModule,
    CommonModule,
    UserModule,
    AuthModule,
    Domain0001Module,
    Domain0009Module,
    Domain0010Module,
    Domain0005Module,
    Domain0006Module,
    Domain0003Module,
    Domain0015Module,
    Domain0007Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // bind the middleware,
    consumer
      .apply(AlsMiddleware)
      .exclude('')
      // and register it for all routes (in case of Fastify use '(.*)')
      .forRoutes('*');
  }
}
