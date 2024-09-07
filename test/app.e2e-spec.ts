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

  it('/graphql createDomain0021s should correctly update the mpath', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain0021s($input: CreateDomain0021sInput!) {
        createDomain0021s(input: $input) {
          domain0021s {
            id
            domain0021001
            children {
              id
              domain0021001
              children {
                id
                domain0021001
                children {
                  id
                  domain0021001
                  children {
                    id
                    domain0021001
                  }
                }
              }
            }
          }
        }
      }
      `,
      {
        input: {
          domain0021s: [
            {
              id: 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44',
              parentId: '221a19d5-bb02-42c8-8539-24446325e958',
              domain0021001: 10,
            },
            {
              id: 'cf9a9657-b85f-4a25-ae0b-526a0443a23d',
              parentId: 'aab1cae2-a27e-426e-8f31-6124698e98bd',
              domain0021001: 12,
            },
          ],
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain0021s: {
          domain0021s: [
            {
              id: 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44',
              domain0021001: 10,
              children: [
                {
                  id: '993422bd-039a-4276-bedc-0b4a9051b35e',
                  domain0021001: 20,
                  children: [
                    {
                      id: 'a0898ce1-e7ea-4de3-8853-2269468bc251',
                      domain0021001: 30,
                      children: [
                        {
                          id: 'aab1cae2-a27e-426e-8f31-6124698e98bd',
                          domain0021001: 40,
                          children: [
                            {
                              id: 'cf9a9657-b85f-4a25-ae0b-526a0443a23d',
                              domain0021001: 12,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: '3cfe69a8-bcca-4b74-b3d9-9e75b41da641',
                      domain0021001: 31,
                      children: [],
                    },
                    {
                      id: 'b83d41e0-0a5d-4466-9db6-22b5392b4354',
                      domain0021001: 32,
                      children: [],
                    },
                  ],
                },
                {
                  id: '46621bee-bd35-45fa-be2b-722065047ee5',
                  domain0021001: 21,
                  children: [],
                },
                {
                  id: '181f4ac5-fcb2-4976-a25f-4e398cc0ed33',
                  domain0021001: 22,
                  children: [],
                },
              ],
            },
            {
              id: 'cf9a9657-b85f-4a25-ae0b-526a0443a23d',
              domain0021001: 12,
              children: [],
            },
          ],
        },
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
