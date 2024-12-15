import { Test, TestingModule } from '@nestjs/testing';

import { Domain10Resolver } from './domain-10.resolver';
import { Domain10Service } from './domain-10.service';

describe('Domain10Resolver', () => {
  let resolver: Domain10Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain10Resolver, Domain10Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain10Resolver>(Domain10Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
