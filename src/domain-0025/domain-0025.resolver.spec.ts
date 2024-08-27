import { Test, TestingModule } from '@nestjs/testing';

import { Domain0025Resolver } from './domain-0025.resolver';
import { Domain0025Service } from './domain-0025.service';

describe('Domain0025Resolver', () => {
  let resolver: Domain0025Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0025Resolver, Domain0025Service],
    })
    .useMocker(() => ({}))
    .compile();

    resolver = module.get<Domain0025Resolver>(
      Domain0025Resolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
