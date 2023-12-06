import { Test, TestingModule } from '@nestjs/testing';
import { Domain1Service } from './domain1.service';

describe('Domain1Service', () => {
  let service: Domain1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain1Service],
    }).compile();

    service = module.get<Domain1Service>(Domain1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
