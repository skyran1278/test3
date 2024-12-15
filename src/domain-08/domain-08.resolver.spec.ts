import { Test, TestingModule } from '@nestjs/testing';

import { Domain08Resolver } from './domain-08.resolver';
import { Domain08Service } from './domain-08.service';

describe('Domain08Resolver', () => {
  let resolver: Domain08Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain08Resolver, Domain08Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain08Resolver>(Domain08Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
