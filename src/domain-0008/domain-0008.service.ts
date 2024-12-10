import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0008 } from './domain-0008.entity';
import { Domain0008Repository } from './domain-0008.repository';
import { CreateDomain0008Input } from './mutation/create-domain-0008.input';
import { UpdateDomain0008Input } from './mutation/update-domain-0008.input';
import { UpdateDomain0008sInput } from './mutation/update-domain-0008s.input';
import { Domain0008PageArgs } from './query/domain-0008-page.args';

@Injectable()
export class Domain0008Service {
  constructor(private readonly repo: Domain0008Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0008Input | UpdateDomain0008Input,
  ): Promise<Domain0008> {
    const domain0008 = this.repo.create(input);
    await this.repo.save(domain0008);

    return domain0008;
  }

  @Transactional()
  findPage(args: Domain0008PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async updateMany(input: UpdateDomain0008sInput): Promise<Domain0008[]> {
    return this.repo.save(this.repo.create(input.domain0008s));
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0008 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0008);
  }
}
