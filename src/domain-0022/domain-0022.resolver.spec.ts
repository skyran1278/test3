import { Test, TestingModule } from '@nestjs/testing';

import { Domain0022Resolver } from './domain-0022.resolver';
import { Domain0022Service } from './domain-0022.service';

describe('Domain0022Resolver', () => {
  let resolver: Domain0022Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0022Resolver, Domain0022Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain0022Resolver>(Domain0022Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
