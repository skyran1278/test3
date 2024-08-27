import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0025 } from './domain-0025.entity';
import { Domain0025Repository } from './domain-0025.repository';
import { CreateDomain0025Input } from './mutation/create-domain-0025.input';
import { UpdateDomain0025Input } from './mutation/update-domain-0025.input';
import { Domain0025PageArgs } from './query/domain-0025-page.args';

@Injectable()
export class Domain0025Service {
  constructor(private readonly repo: Domain0025Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0025Input | UpdateDomain0025Input,
  ): Promise<Domain0025> {
    const domain0025 = await this.repo.save(input);

    return domain0025;
  }

  @Transactional()
  findPage(args: Domain0025PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0025 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0025);
  }
}
