import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { TreeBaseRepository } from '../common/tree-base.repository';
import { Domain22 } from './domain-22.entity';

@Injectable()
export class Domain22Repository extends TreeBaseRepository<Domain22> {
  constructor(readonly manager: EntityManager) {
    super(Domain22, manager);
  }
}
