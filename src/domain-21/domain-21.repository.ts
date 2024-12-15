import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { TreeBaseRepository } from '../common/tree-base.repository';
import { Domain21 } from './domain-21.entity';

@Injectable()
export class Domain21Repository extends TreeBaseRepository<Domain21> {
  constructor(readonly manager: EntityManager) {
    super(Domain21, manager);
  }
}
