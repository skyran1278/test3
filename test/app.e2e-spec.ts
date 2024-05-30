/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Express } from 'express';
import { EnvironmentVariables } from 'src/configuration/environment-variables';
import request from 'supertest';
import {
  StorageDriver,
  initializeTransactionalContext,
} from 'typeorm-transactional';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<Express>;
  let configService: ConfigService<EnvironmentVariables, true>;

  async function graphqlRequest(
    query: string,
    variables = {},
    token: string = configService.get('TEST_TOKEN'),
  ) {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', token)
      .send({
        query,
        variables,
      });
    return res.body as { data: unknown; errors: unknown };
  }

  beforeAll(async () => {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configService = app.get(ConfigService);

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

  it('/graphql signIn', async () => {
    const body = await graphqlRequest(
      `mutation SignIn($input: SignInInput!) {
        signIn(input: $input) {
          access_token
        }
      }`,
      {
        input: {
          user001: 1,
          user002: 1,
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        signIn: {
          access_token: expect.any(String),
        },
      },
    });
  });

  it('/graphql createDomain0001', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain0001($input: CreateDomain0001Input!) {
        createDomain0001(input: $input) {
          domain0001 {
            createdUser {
              id
            }
            createdUserId
            createdAt
            domain0001001
            id
            updatedUser {
              id
            }
            updatedUserId
            updatedAt
          }
        }
      }`,
      {
        input: {
          domain0001001: 1,
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain0001: {
          domain0001: {
            createdUser: {
              id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
            },
            createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
            createdAt: expect.any(String),
            domain0001001: 1,
            id: expect.any(String),
            updatedUser: {
              id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
            },
            updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
            updatedAt: expect.any(String),
          },
        },
      },
    });
  });

  it('/graphql createDomain0003', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain0003($input: CreateDomain0003Input!) {
        createDomain0003(input: $input) {
          domain0003 {
            id
            domain0003001
            domain0003002
            domain0003003
            domain0003004
            domain0003005
            domain0003006
            domain0003007
            domain0003008
            domain0003011
          }
        }
      }`,
      {
        input: {
          domain0003001: true,
          domain0003002: 1,
          domain0003003: 'varchar',
          domain0003004: '2024-03-31',
          domain0003005: '10',
          domain0003006: 'ACTIVE',
          domain0003007: {
            domain0003007: 'domain0003007',
          },
          domain0003008: {
            domain0003008: 'domain0003008',
          },
          domain0003011: [1, 2, 3],
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain0003: {
          domain0003: {
            id: expect.any(String),
            domain0003001: true,
            domain0003002: 1,
            domain0003003: 'varchar',
            domain0003004: '2024-03-31',
            domain0003005: '10',
            domain0003006: 'ACTIVE',
            domain0003007: {
              domain0003007: 'domain0003007',
            },
            domain0003008: {
              domain0003008: 'domain0003008',
            },
            domain0003011: [1, 2, 3],
          },
        },
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
