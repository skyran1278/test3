import { Test, TestingModule } from '@nestjs/testing';

import { Domain0003Resolver } from './domain-0003.resolver';
import { Domain0003Service } from './domain-0003.service';

describe('Domain0003Resolver', () => {
  let resolver: Domain0003Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0003Resolver, Domain0003Service],
    })
    .useMocker(() => ({}))
    .compile();

    resolver = module.get<Domain0003Resolver>(
      Domain0003Resolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
