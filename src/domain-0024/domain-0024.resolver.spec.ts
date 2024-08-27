import { Test, TestingModule } from '@nestjs/testing';

import { Domain0024Resolver } from './domain-0024.resolver';
import { Domain0024Service } from './domain-0024.service';

describe('Domain0024Resolver', () => {
  let resolver: Domain0024Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0024Resolver, Domain0024Service],
    })
    .useMocker(() => ({}))
    .compile();

    resolver = module.get<Domain0024Resolver>(
      Domain0024Resolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
