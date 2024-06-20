import { Test, TestingModule } from '@nestjs/testing';

import { CustomAuthenticationError } from './custom-authentication.error';
import { ErrorResolver } from './error.resolver';

describe('ErrorResolver', () => {
  let resolver: ErrorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorResolver],
    }).compile();

    resolver = module.get<ErrorResolver>(ErrorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should throw a CustomAuthenticationError', () => {
    try {
      resolver.customAuthenticationError();
    } catch (error) {
      const e = error as CustomAuthenticationError;
      expect(e.getResponse()).toEqual({
        statusCode: 401,
        message: 'Bearer Token is invalid or expired.',
      });
      expect(e.stack).toBeDefined();
    }
  });
});
