import { Test, TestingModule } from '@nestjs/testing';

import { Domain0008Service } from './domain-0008.service';

describe('Domain0008Service', () => {
  let service: Domain0008Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0008Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain0008Service>(Domain0008Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
