import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0024 } from './domain-0024.entity';

@Injectable()
export class Domain0024Repository extends BaseRepository<Domain0024> {
  constructor(
    @InjectRepository(Domain0024)
    readonly repo: Repository<Domain0024>,
  ) {
    super(repo);
  }
}
