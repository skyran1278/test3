import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain01 } from './domain-01.entity';

@Injectable()
export class Domain01Repository extends BaseRepository<Domain01> {
  constructor(readonly manager: EntityManager) {
    super(Domain01, manager);
  }
}
