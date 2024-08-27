import { Test, TestingModule } from '@nestjs/testing';

import { Domain0025Service } from './domain-0025.service';

describe('Domain0025Service', () => {
  let service: Domain0025Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0025Service],
    })
    .useMocker(() => ({}))
    .compile();

    service = module.get<Domain0025Service>(
      Domain0025Service,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
