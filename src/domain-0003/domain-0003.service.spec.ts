import { Test, TestingModule } from '@nestjs/testing';

import { Domain0003Service } from './domain-0003.service';

describe('Domain0003Service', () => {
  let service: Domain0003Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0003Service],
    })
    .useMocker(() => ({}))
    .compile();

    service = module.get<Domain0003Service>(
      Domain0003Service,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
