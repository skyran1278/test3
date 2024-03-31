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
import { Domain1Module } from './domain-1/domain-1.module';
import { Domain2Module } from './domain-2/domain-2.module';
import { Domain3Module } from './domain-3/domain-3.module';
import { Domain4Module } from './domain-4/domain-4.module';
import { Domain5Module } from './domain-5/domain-5.module';
import { Domain6Module } from './domain-6/domain-6.module';
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
    Domain1Module,
    Domain2Module,
    Domain3Module,
    Domain4Module,
    Domain5Module,
    Domain6Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
