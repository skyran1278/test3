import { Test, TestingModule } from '@nestjs/testing';

import { Domain0015Service } from './domain-0015.service';

describe('Domain0015Service', () => {
  let service: Domain0015Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0015Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain0015Service>(Domain0015Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
