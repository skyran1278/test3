import { Test, TestingModule } from '@nestjs/testing';

import { Domain01Service } from './domain-01.service';

describe('Domain01Service', () => {
  let service: Domain01Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain01Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain01Service>(Domain01Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
