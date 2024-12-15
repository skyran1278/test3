import { Test, TestingModule } from '@nestjs/testing';

import { Domain09Resolver } from './domain-09.resolver';
import { Domain09Service } from './domain-09.service';

describe('Domain09Resolver', () => {
  let resolver: Domain09Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain09Resolver, Domain09Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain09Resolver>(Domain09Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
