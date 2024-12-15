import { Test, TestingModule } from '@nestjs/testing';

import { Domain15Resolver } from './domain-15.resolver';
import { Domain15Service } from './domain-15.service';

describe('Domain15Resolver', () => {
  let resolver: Domain15Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain15Resolver, Domain15Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain15Resolver>(Domain15Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
