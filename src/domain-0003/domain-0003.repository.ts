import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0003 } from './domain-0003.entity';

@Injectable()
export class Domain0003Repository extends BaseRepository<Domain0003> {
  constructor(
    @InjectRepository(Domain0003)
    readonly repo: Repository<Domain0003>,
  ) {
    super(repo);
  }
}
