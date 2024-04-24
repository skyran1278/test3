import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { Domain0001Module } from './domain-0001.module';

describe('Cats', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [Domain0001Module],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer())
      .post('/graphql')
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
        expect(res.body).toEqual({
          data: {
            createDomain0001: {
              domain0001: {
                createdUser: {
                  id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                },
                createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                createdAt: '2024-04-24T05:25:51.634Z',
                domain0001001: 1,
                id: '51e7101b-162c-4326-8388-e839101dd15f',
                updatedUser: {
                  id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                },
                updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                updatedAt: '2024-04-24T05:25:51.634Z',
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
