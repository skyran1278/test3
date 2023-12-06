import { Test, TestingModule } from '@nestjs/testing';
import { Domain1Resolver } from './domain1.resolver';
import { Domain1Service } from './domain1.service';

describe('Domain1Resolver', () => {
  let resolver: Domain1Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain1Resolver, Domain1Service],
    }).compile();

    resolver = module.get<Domain1Resolver>(Domain1Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
