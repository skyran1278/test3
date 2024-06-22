import { Test, TestingModule } from '@nestjs/testing';

import { Domain0010Service } from './domain-0010.service';

describe('Domain0010Service', () => {
  let service: Domain0010Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0010Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain0010Service>(Domain0010Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
