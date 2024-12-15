import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain10 } from './domain-10.entity';

@Injectable()
export class Domain10Repository extends BaseRepository<Domain10> {
  constructor(readonly manager: EntityManager) {
    super(Domain10, manager);
  }
}
