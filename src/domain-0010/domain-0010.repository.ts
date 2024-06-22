import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0010 } from './domain-0010.entity';

@Injectable()
export class Domain0010Repository extends BaseRepository<Domain0010> {
  constructor(
    @InjectRepository(Domain0010)
    readonly repo: Repository<Domain0010>,
  ) {
    super(repo);
  }
}
