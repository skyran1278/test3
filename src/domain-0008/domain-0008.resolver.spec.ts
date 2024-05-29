import { Test, TestingModule } from '@nestjs/testing';

import { Domain0008Resolver } from './domain-0008.resolver';

describe('Domain0008Resolver', () => {
  let resolver: Domain0008Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0008Resolver],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain0008Resolver>(Domain0008Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
