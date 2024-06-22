import { Test, TestingModule } from '@nestjs/testing';

import { Domain0009Service } from './domain-0009.service';

describe('Domain0009Service', () => {
  let service: Domain0009Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0009Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain0009Service>(Domain0009Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
