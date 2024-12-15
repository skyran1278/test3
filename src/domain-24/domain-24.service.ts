import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain24 } from './domain-24.entity';
import { Domain24Repository } from './domain-24.repository';
import { CreateDomain24Input } from './mutation/create-domain-24.input';
import { UpdateDomain24Input } from './mutation/update-domain-24.input';
import { Domain24PageArgs } from './query/domain-24-page.args';

@Injectable()
export class Domain24Service {
  constructor(private readonly repo: Domain24Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain24Input | UpdateDomain24Input,
  ): Promise<Domain24> {
    const domain24 = this.repo.create(input);
    await this.repo.save(domain24);

    return domain24;
  }

  @Transactional()
  findPage(args: Domain24PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain24 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain24);
  }
}
