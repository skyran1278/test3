import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0003 } from './domain-0003.entity';

@Injectable()
export class Domain0003Repository extends BaseRepository<Domain0003> {
  constructor(readonly manager: EntityManager) {
    super(Domain0003, manager);
  }
}
