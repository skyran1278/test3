import { Test, TestingModule } from '@nestjs/testing';

import { ErrorController } from './error.controller';

describe('ErrorController', () => {
  let controller: ErrorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrorController],
    }).compile();

    controller = module.get<ErrorController>(ErrorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw a CustomAuthenticationError', () => {
    expect(() =>
      controller.customAuthenticationError(),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Bearer Token is invalid or expired."`,
    );
  });
});
