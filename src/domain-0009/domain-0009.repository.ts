import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0009 } from './domain-0009.entity';

@Injectable()
export class Domain0009Repository extends BaseRepository<Domain0009> {
  constructor(readonly manager: EntityManager) {
    super(Domain0009, manager);
  }
}
