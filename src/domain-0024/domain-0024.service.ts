import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0024 } from './domain-0024.entity';
import { Domain0024Repository } from './domain-0024.repository';
import { CreateDomain0024Input } from './mutation/create-domain-0024.input';
import { UpdateDomain0024Input } from './mutation/update-domain-0024.input';
import { Domain0024PageArgs } from './query/domain-0024-page.args';

@Injectable()
export class Domain0024Service {
  constructor(private readonly repo: Domain0024Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0024Input | UpdateDomain0024Input,
  ): Promise<Domain0024> {
    const domain0024 = await this.repo.save(input);

    return domain0024;
  }

  @Transactional()
  findPage(args: Domain0024PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0024 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0024);
  }
}
