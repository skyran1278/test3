import { Test, TestingModule } from '@nestjs/testing';

import { Domain0001Resolver } from './domain-0001.resolver';
import { Domain0001Service } from './domain-0001.service';

describe('Domain0001Resolver', () => {
  let resolver: Domain0001Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0001Resolver, Domain0001Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain0001Resolver>(Domain0001Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
