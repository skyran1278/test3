import { Test, TestingModule } from '@nestjs/testing';

import { Domain22Service } from './domain-22.service';

describe('Domain22Service', () => {
  let service: Domain22Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain22Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain22Service>(Domain22Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
