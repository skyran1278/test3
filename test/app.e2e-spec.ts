import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import {
  StorageDriver,
  initializeTransactionalContext,
} from 'typeorm-transactional';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/health (GET)', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({
        status: 'ok',
        info: {
          database: { status: 'up' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
          storage: { status: 'up' },
        },
        error: {},
        details: {
          database: { status: 'up' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
          storage: { status: 'up' },
        },
      });
  });

  // it('/graphql (POST)', () => {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query:
  //         'mutation CreateDomain0001($input: CreateDomain0001Input!) {\n  createDomain0001(input: $input) {\n    domain0001 {\n      createdUser {\n        id\n      }\n      createdUserId\n      createdAt\n      domain0001001\n      id\n      updatedUser {\n        id\n      }\n      updatedUserId\n      updatedAt\n    }\n  }\n}',
  //       variables: {
  //         input: {
  //           domain0001001: 1,
  //         },
  //       },
  //       operationName: 'CreateDomain0001',
  //     })
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual({
  //         data: {
  //           createDomain0001: {
  //             domain0001: {
  //               createdUser: {
  //                 id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
  //               },
  //               createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
  //               createdAt: '2024-04-24T05:25:51.634Z',
  //               domain0001001: 1,
  //               id: '51e7101b-162c-4326-8388-e839101dd15f',
  //               updatedUser: {
  //                 id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
  //               },
  //               updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
  //               updatedAt: '2024-04-24T05:25:51.634Z',
  //             },
  //           },
  //         },
  //       });
  //     });
  // });

  afterAll(async () => {
    await app.close();
  });
});
