import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { Domain0006 } from './domain-0006.entity';
import { CreateDomain0006Input } from './mutation/create-domain-0006.input';
import { Domain0006PageArgs } from './query/domain-0006-page.args';

@Injectable()
export class Domain0006Service extends BaseService<Domain0006> {
  constructor(
    @InjectRepository(Domain0006)
    readonly repo: Repository<Domain0006>,
  ) {
    super(repo);
  }

  @Transactional()
  async saveOne(input: CreateDomain0006Input): Promise<Domain0006> {
    return this.save(input);
  }

  @Transactional()
  findPage(args: Domain0006PageArgs) {
    return this.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0006 = await this.findOneByOrFail({ id });

    return this.softRemove(domain0006);
  }
}
