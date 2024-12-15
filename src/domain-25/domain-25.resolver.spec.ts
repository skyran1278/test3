import { Test, TestingModule } from '@nestjs/testing';

import { Domain25Resolver } from './domain-25.resolver';
import { Domain25Service } from './domain-25.service';

describe('Domain25Resolver', () => {
  let resolver: Domain25Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain25Resolver, Domain25Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain25Resolver>(Domain25Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
