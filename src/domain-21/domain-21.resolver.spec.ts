import { Test, TestingModule } from '@nestjs/testing';

import { Domain21Resolver } from './domain-21.resolver';
import { Domain21Service } from './domain-21.service';

describe('Domain21Resolver', () => {
  let resolver: Domain21Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain21Resolver, Domain21Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain21Resolver>(Domain21Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
