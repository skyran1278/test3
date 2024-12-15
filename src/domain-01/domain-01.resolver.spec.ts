import { Test, TestingModule } from '@nestjs/testing';

import { Domain01Resolver } from './domain-01.resolver';
import { Domain01Service } from './domain-01.service';

describe('Domain01Resolver', () => {
  let resolver: Domain01Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain01Resolver, Domain01Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain01Resolver>(Domain01Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
