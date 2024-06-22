import { Test, TestingModule } from '@nestjs/testing';

import { Domain0009Resolver } from './domain-0009.resolver';
import { Domain0009Service } from './domain-0009.service';

describe('Domain0009Resolver', () => {
  let resolver: Domain0009Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0009Resolver, Domain0009Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain0009Resolver>(Domain0009Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
