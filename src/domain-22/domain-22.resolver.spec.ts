import { Test, TestingModule } from '@nestjs/testing';

import { Domain22Resolver } from './domain-22.resolver';
import { Domain22Service } from './domain-22.service';

describe('Domain22Resolver', () => {
  let resolver: Domain22Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain22Resolver, Domain22Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain22Resolver>(Domain22Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
