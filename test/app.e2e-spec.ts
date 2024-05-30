import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Express } from 'express';
import request from 'supertest';
import {
  StorageDriver,
  initializeTransactionalContext,
} from 'typeorm-transactional';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<Express>;

  beforeAll(async () => {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  /**
   * because of wsl 2, memory_heap and memory_rss are too high, so we are not validating them
   */
  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect((res) => {
        expect(res.body).toMatchObject({
          // status: 'ok',
          info: {
            database: { status: 'up' },
            // memory_heap: { status: 'up' },
            // memory_rss: { status: 'up' },
            storage: { status: 'up' },
          },
          error: {},
          details: {
            database: { status: 'up' },
            // memory_heap: { status: 'up' },
            // memory_rss: { status: 'up' },
            storage: { status: 'up' },
          },
        });
      });
  });

  it('/graphql (POST) createDomain0001', () => {
    const configService = app.get(ConfigService);
    return request(app.getHttpServer())
      .post('/graphql')
      .set({
        Authorization: configService.get<string>('TEST_TOKEN') ?? '',
      })
      .send({
        query:
          'mutation CreateDomain0001($input: CreateDomain0001Input!) {\n  createDomain0001(input: $input) {\n    domain0001 {\n      createdUser {\n        id\n      }\n      createdUserId\n      createdAt\n      domain0001001\n      id\n      updatedUser {\n        id\n      }\n      updatedUserId\n      updatedAt\n    }\n  }\n}',
        variables: {
          input: {
            domain0001001: 1,
          },
        },
        operationName: 'CreateDomain0001',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          data: {
            createDomain0001: {
              domain0001: {
                createdUser: {
                  id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                },
                createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                domain0001001: 1,
                updatedUser: {
                  id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                },
                updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
              },
            },
          },
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
