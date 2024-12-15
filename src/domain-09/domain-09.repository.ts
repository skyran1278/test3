import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain09 } from './domain-09.entity';

@Injectable()
export class Domain09Repository extends BaseRepository<Domain09> {
  constructor(readonly manager: EntityManager) {
    super(Domain09, manager);
  }
}
