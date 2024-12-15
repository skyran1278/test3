import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain24 } from './domain-24.entity';

@Injectable()
export class Domain24Repository extends BaseRepository<Domain24> {
  constructor(readonly manager: EntityManager) {
    super(Domain24, manager);
  }
}
