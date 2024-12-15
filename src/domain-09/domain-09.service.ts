import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain09 } from './domain-09.entity';
import { Domain09Repository } from './domain-09.repository';
import { CreateDomain09Input } from './mutation/create-domain-09.input';
import { UpdateDomain09Input } from './mutation/update-domain-09.input';
import { Domain09PageArgs } from './query/domain-09-page.args';

@Injectable()
export class Domain09Service {
  constructor(private readonly repo: Domain09Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain09Input | UpdateDomain09Input,
  ): Promise<Domain09> {
    const domain09 = this.repo.create(input);
    await this.repo.save(domain09);

    return domain09;
  }

  @Transactional()
  findPage(args: Domain09PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain09 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain09);
  }
}
