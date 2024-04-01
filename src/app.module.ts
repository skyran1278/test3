import { join } from 'path';

import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { Domain0001Module } from './domain-0001/domain-0001.module';
import { Domain0002Module } from './domain-0002/domain-0002.module';
import { Domain0003Module } from './domain-0003/domain-0003.module';
import { Domain0004Module } from './domain-0004/domain-0004.module';
import { Domain0005Module } from './domain-0005/domain-0005.module';
import { Domain0006Module } from './domain-0006/domain-0006.module';
import { UserModule } from './user/user.module';
import { Domain0011Module } from './domain-0011/domain-0011.module';
import { Domain0012Module } from './domain-0012/domain-0012.module';

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
    CommonModule,
    UserModule,
    AuthModule,
    Domain0001Module,
    Domain0002Module,
    Domain0003Module,
    Domain0004Module,
    Domain0005Module,
    Domain0006Module,
    Domain0011Module,
    Domain0012Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
