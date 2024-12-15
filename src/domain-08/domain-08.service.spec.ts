import { Test, TestingModule } from '@nestjs/testing';

import { Domain08Service } from './domain-08.service';

describe('Domain08Service', () => {
  let service: Domain08Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain08Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain08Service>(Domain08Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
