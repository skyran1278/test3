import { Test, TestingModule } from '@nestjs/testing';

import { Domain0015Resolver } from './domain-0015.resolver';
import { Domain0015Service } from './domain-0015.service';

describe('Domain0015Resolver', () => {
  let resolver: Domain0015Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0015Resolver, Domain0015Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain0015Resolver>(Domain0015Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
