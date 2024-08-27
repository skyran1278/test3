import { Test, TestingModule } from '@nestjs/testing';

import { Domain0024Service } from './domain-0024.service';

describe('Domain0024Service', () => {
  let service: Domain0024Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0024Service],
    })
    .useMocker(() => ({}))
    .compile();

    service = module.get<Domain0024Service>(
      Domain0024Service,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
