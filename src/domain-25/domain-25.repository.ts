import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain25 } from './domain-25.entity';

@Injectable()
export class Domain25Repository extends BaseRepository<Domain25> {
  constructor(readonly manager: EntityManager) {
    super(Domain25, manager);
  }
}
