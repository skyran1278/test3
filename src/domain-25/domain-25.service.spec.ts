import { Test, TestingModule } from '@nestjs/testing';

import { Domain25Service } from './domain-25.service';

describe('Domain25Service', () => {
  let service: Domain25Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain25Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain25Service>(Domain25Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
