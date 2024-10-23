import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0025 } from './domain-0025.entity';

@Injectable()
export class Domain0025Repository extends BaseRepository<Domain0025> {
  constructor(readonly manager: EntityManager) {
    super(Domain0025, manager);
  }
}
