import { Test, TestingModule } from '@nestjs/testing';

import { Domain0022Repository } from './domain-0022.repository';

describe('Domain0022Service', () => {
  let repo: Domain0022Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0022Repository],
    })
      .useMocker(() => ({
        findBy: jest.fn(),
        save: jest.fn(),
        findOneBy: jest.fn(),
      }))
      .compile();

    repo = module.get<Domain0022Repository>(Domain0022Repository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  // it('should save', async () => {
  //   const entity = { id: '1', parentId: '2', parent: null };
  //   const parent = { id: '2' };

  //   repo.findBy = jest.fn().mockResolvedValue([parent]);
  //   repo.findOneBy = jest.fn().mockResolvedValue(parent);

  //   await repo.save(entity);

  //   expect(entity.parent).toBe(parent);
  // });
});
