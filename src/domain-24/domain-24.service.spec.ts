import { Test, TestingModule } from '@nestjs/testing';

import { Domain24Service } from './domain-24.service';

describe('Domain24Service', () => {
  let service: Domain24Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain24Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain24Service>(Domain24Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
