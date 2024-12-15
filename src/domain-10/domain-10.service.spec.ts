import { Test, TestingModule } from '@nestjs/testing';

import { Domain10Service } from './domain-10.service';

describe('Domain10Service', () => {
  let service: Domain10Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain10Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain10Service>(Domain10Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
