import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain03 } from './domain-03.entity';

@Injectable()
export class Domain03Repository extends BaseRepository<Domain03> {
  constructor(readonly manager: EntityManager) {
    super(Domain03, manager);
  }
}
