import { Test, TestingModule } from '@nestjs/testing';

import { Domain24Resolver } from './domain-24.resolver';
import { Domain24Service } from './domain-24.service';

describe('Domain24Resolver', () => {
  let resolver: Domain24Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain24Resolver, Domain24Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain24Resolver>(Domain24Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
