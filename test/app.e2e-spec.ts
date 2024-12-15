import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Express } from 'express';
import request from 'supertest';
import { DataSource } from 'typeorm';
import {
  StorageDriver,
  initializeTransactionalContext,
} from 'typeorm-transactional';

import { AppModule } from './../src/app.module';
import { TypedConfigService } from '../src/configuration/typed-config.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<Express>;
  let configService: TypedConfigService;
  let dataSource: DataSource;

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
    dataSource = app.get(DataSource);

    await dataSource.runMigrations();

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
          email: 'nai@u-ran.com',
        },
      },
    });
  });

  it('/graphql createDomain01', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain01($input: CreateDomain01Input!) {
        createDomain01(input: $input) {
          domain01 {
            createdUser {
              id
            }
            createdUserId
            createdAt
            domain0101
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
          domain0101: 1,
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain01: {
          domain01: {
            createdUser: {
              id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
            },
            createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
            domain0101: 1,
            updatedUser: {
              id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
            },
            updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
          },
        },
      },
    });
  });

  it('/graphql createDomain03', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain03($input: CreateDomain03Input!) {
        createDomain03(input: $input) {
          domain03 {
            id
            domain0301
            domain0302
            domain0303
            domain0304
            domain0305
            domain0306
            domain0307
            domain0308
            domain0311
          }
        }
      }`,
      {
        input: {
          domain0301: true,
          domain0302: 1,
          domain0303: 'varchar',
          domain0304: '2024-03-31',
          domain0305: '10',
          domain0306: 'ACTIVE',
          domain0307: {
            domain0307: 'domain0307',
          },
          domain0308: {
            domain0308: 'domain0308',
          },
          domain0311: [1, 2, 3],
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain03: {
          domain03: {
            domain0301: true,
            domain0302: 1,
            domain0303: 'varchar',
            domain0304: '2024-03-31',
            domain0305: '10',
            domain0306: 'ACTIVE',
            domain0307: {
              domain0307: 'domain0307',
            },
            domain0308: {
              domain0308: 'domain0308',
            },
            domain0311: [1, 2, 3],
          },
        },
      },
    });
  });

  it('/graphql createDomain08', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain08($input: CreateDomain08Input!) {
        createDomain08(input: $input) {
          domain08 {
            domain09s {
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
              domain10s {
                createdAt
                createdUserId
                deletedAt
                deletedUserId
                domain09 {
                  createdAt
                  createdUserId
                  deletedAt
                  deletedUserId
                  domain0901
                  id
                  updatedAt
                  updatedUserId
                }
                domain09Id
                domain1001
                id
                updatedAt
                updatedUserId
              }
              domain0901
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
          domain0801: 2,
          domain09s: [
            {
              domain0901: 2,
              domain10s: [
                {
                  domain1001: 2,
                },
                {
                  domain1001: 2,
                },
              ],
            },
          ],
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain08: {
          domain08: {
            domain09s: [
              {
                createdUser: {
                  id: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                },
                createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                deletedAt: null,
                deletedUser: null,
                deletedUserId: null,
                domain10s: [
                  {
                    createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                    deletedAt: null,
                    deletedUserId: null,
                    domain09: {
                      createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                      deletedAt: null,
                      deletedUserId: null,
                      domain0901: 2,
                      updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                    },
                    domain1001: 2,
                    updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                  },
                  {
                    createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                    deletedAt: null,
                    deletedUserId: null,
                    domain09: {
                      createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                      deletedAt: null,
                      deletedUserId: null,
                      domain0901: 2,
                      updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                    },
                    domain1001: 2,
                    updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
                  },
                ],
                domain0901: 2,
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

  it('/graphql createDomain15', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain15($input: CreateDomain15Input!) {
        createDomain15(input: $input) {
          domain15 {
            id
            domain1501
            createdUserId
            updatedUserId
          }
        }
      }`,
      {
        input: {
          domain1501: 1,
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain15: {
          domain15: {
            domain1501: 1,
            createdUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
            updatedUserId: '94107a27-4c24-4912-be7b-6f4b0b462acb',
          },
        },
      },
    });
  });

  it('/graphql createDomain21', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain21($input: CreateDomain21Input!) {
        createDomain21(input: $input) {
          domain21 {
            domain2101
          }
        }
      }`,
      {
        input: {
          domain2101: 1,
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain21: {
          domain21: {
            domain2101: 1,
          },
        },
      },
    });
  });

  it('/graphql createDomain21s should correctly update the mpath', async () => {
    const body = await graphqlRequest(
      `mutation CreateDomain21s($input: CreateDomain21sInput!) {
        createDomain21s(input: $input) {
          domain21s {
            id
            domain2101
            children {
              id
              domain2101
              children {
                id
                domain2101
                children {
                  id
                  domain2101
                  children {
                    id
                    domain2101
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
          domain21s: [
            {
              id: 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44',
              parentId: '221a19d5-bb02-42c8-8539-24446325e958',
              domain2101: 10,
            },
            {
              id: 'cf9a9657-b85f-4a25-ae0b-526a0443a23d',
              parentId: 'aab1cae2-a27e-426e-8f31-6124698e98bd',
              domain2101: 12,
            },
          ],
        },
      },
    );

    expect(body).toMatchObject({
      data: {
        createDomain21s: {
          domain21s: [
            {
              id: 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44',
              domain2101: 10,
              children: [
                {
                  id: '993422bd-039a-4276-bedc-0b4a9051b35e',
                  domain2101: 20,
                  children: [
                    {
                      id: 'a0898ce1-e7ea-4de3-8853-2269468bc251',
                      domain2101: 30,
                      children: [
                        {
                          id: 'aab1cae2-a27e-426e-8f31-6124698e98bd',
                          domain2101: 40,
                          children: [
                            {
                              id: 'cf9a9657-b85f-4a25-ae0b-526a0443a23d',
                              domain2101: 12,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: '3cfe69a8-bcca-4b74-b3d9-9e75b41da641',
                      domain2101: 31,
                      children: [],
                    },
                    {
                      id: 'b83d41e0-0a5d-4466-9db6-22b5392b4354',
                      domain2101: 32,
                      children: [],
                    },
                  ],
                },
                {
                  id: '46621bee-bd35-45fa-be2b-722065047ee5',
                  domain2101: 21,
                  children: [],
                },
                {
                  id: '181f4ac5-fcb2-4976-a25f-4e398cc0ed33',
                  domain2101: 22,
                  children: [],
                },
              ],
            },
            {
              id: 'cf9a9657-b85f-4a25-ae0b-526a0443a23d',
              domain2101: 12,
              children: [],
            },
          ],
        },
      },
    });
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await app.close();
  });
});
