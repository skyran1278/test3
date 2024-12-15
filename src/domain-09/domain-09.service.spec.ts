import { Test, TestingModule } from '@nestjs/testing';

import { Domain09Service } from './domain-09.service';

describe('Domain09Service', () => {
  let service: Domain09Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain09Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain09Service>(Domain09Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
