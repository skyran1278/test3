import { Test, TestingModule } from '@nestjs/testing';

import { Domain03Resolver } from './domain-03.resolver';
import { Domain03Service } from './domain-03.service';

describe('Domain03Resolver', () => {
  let resolver: Domain03Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain03Resolver, Domain03Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain03Resolver>(Domain03Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
