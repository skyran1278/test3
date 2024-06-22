import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0009 } from './domain-0009.entity';

@Injectable()
export class Domain0009Repository extends BaseRepository<Domain0009> {
  constructor(
    @InjectRepository(Domain0009)
    readonly repo: Repository<Domain0009>,
  ) {
    super(repo);
  }
}
