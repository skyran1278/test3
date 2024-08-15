import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

import { TreeBaseRepository } from '../common/tree-base.repository';
import { Domain0021 } from './domain-0021.entity';

@Injectable()
export class Domain0021Repository extends TreeBaseRepository<Domain0021> {
  constructor(
    @InjectRepository(Domain0021)
    readonly repo: TreeRepository<Domain0021>,
  ) {
    super(repo);
  }
}
