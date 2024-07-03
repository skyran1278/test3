import { Test, TestingModule } from '@nestjs/testing';

import { Domain0021Resolver } from './domain-0021.resolver';
import { Domain0021Service } from './domain-0021.service';

describe('Domain0021Resolver', () => {
  let resolver: Domain0021Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0021Resolver, Domain0021Service],
    })
    .useMocker(() => ({}))
    .compile();

    resolver = module.get<Domain0021Resolver>(
      Domain0021Resolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
