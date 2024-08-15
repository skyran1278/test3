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
import { TypedConfigService } from '../src/configuration/typed-config.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<Express>;
  let configService: TypedConfigService;

  async function graphqlRequest(
    query: string,
    variables = {},
    token = configService.get('TEST_TOKEN'),
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

  it('/graphql signIn', async () => {
    const body = await graphqlRequest(
      `mutation SignIn($input: SignInInput!) {
        signIn(input: $input) {
          accessToken
        }
      }`,
      {
        input: {
          email: 'nai@u-ran.com',
          password: '1',
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        signIn: {},
      },
    });
  });

  it('/graphql me', async () => {
    const body = await graphqlRequest(
      `query Me {
        me {
          id
          email
        }
      }`,
    );

    expect(body).toMatchObject({
      data: {
        me: {
          id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
          email: 'nai@u-ran',
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

  it('/graphql createDomain0008', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain0008($input: CreateDomain0008Input!) {
        createDomain0008(input: $input) {
          domain0008 {
            domain0009s {
              id
              createdAt
              createdUser {
                id
              }
              createdUserId
              deletedAt
              deletedUser {
                id
              }
              deletedUserId
              domain0010s {
                createdAt
                createdUserId
                deletedAt
                deletedUserId
                domain0009 {
                  createdAt
                  createdUserId
                  deletedAt
                  deletedUserId
                  domain0009001
                  id
                  updatedAt
                  updatedUserId
                }
                domain0009Id
                domain0010001
                id
                updatedAt
                updatedUserId
              }
              domain0009001
              updatedAt
              updatedUser {
                id
              }
              updatedUserId
            }
          }
        }
      }
      `,
      {
        input: {
          domain0008001: 2,
          domain0009s: [
            {
              domain0009001: 2,
              domain0010s: [
                {
                  domain0010001: 2,
                },
                {
                  domain0010001: 2,
                },
              ],
            },
          ],
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain0008: {
          domain0008: {
            domain0009s: [
              {
                createdUser: {
                  id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                },
                createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                deletedAt: null,
                deletedUser: null,
                deletedUserId: null,
                domain0010s: [
                  {
                    createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                    deletedAt: null,
                    deletedUserId: null,
                    domain0009: {
                      createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                      deletedAt: null,
                      deletedUserId: null,
                      domain0009001: 2,
                      updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                    },
                    domain0010001: 2,
                    updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                  },
                  {
                    createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                    deletedAt: null,
                    deletedUserId: null,
                    domain0009: {
                      createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                      deletedAt: null,
                      deletedUserId: null,
                      domain0009001: 2,
                      updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                    },
                    domain0010001: 2,
                    updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                  },
                ],
                domain0009001: 2,
                updatedUser: {
                  id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                },
                updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
              },
            ],
          },
        },
      },
    });
  });

  it('/graphql createDomain0015', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain0015($input: CreateDomain0015Input!) {
        createDomain0015(input: $input) {
          domain0015 {
            id
            domain0015001
            createdUserId
            updatedUserId
          }
        }
      }`,
      {
        input: {
          domain0015001: 1,
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain0015: {
          domain0015: {
            domain0015001: 1,
            createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
            updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
          },
        },
      },
    });
  });

  it('/graphql createDomain0021', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain0021($input: CreateDomain0021Input!) {
        createDomain0021(input: $input) {
          domain0021 {
            domain0021001
          }
        }
      }`,
      {
        input: {
          domain0021001: 1,
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain0021: {
          domain0021: {
            domain0021001: 1,
          },
        },
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
