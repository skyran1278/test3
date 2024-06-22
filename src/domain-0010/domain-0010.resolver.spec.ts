import { Test, TestingModule } from '@nestjs/testing';

import { Domain0010Resolver } from './domain-0010.resolver';
import { Domain0010Service } from './domain-0010.service';

describe('Domain0010Resolver', () => {
  let resolver: Domain0010Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0010Resolver, Domain0010Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<Domain0010Resolver>(Domain0010Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
