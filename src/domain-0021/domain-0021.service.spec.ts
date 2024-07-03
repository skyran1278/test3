import { Test, TestingModule } from '@nestjs/testing';

import { Domain0021Service } from './domain-0021.service';

describe('Domain0021Service', () => {
  let service: Domain0021Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0021Service],
    })
    .useMocker(() => ({}))
    .compile();

    service = module.get<Domain0021Service>(
      Domain0021Service,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
