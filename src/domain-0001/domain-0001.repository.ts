import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0001 } from './domain-0001.entity';

@Injectable()
export class Domain0001Repository extends BaseRepository<Domain0001> {
  constructor(readonly manager: EntityManager) {
    super(Domain0001, manager);
  }
}
