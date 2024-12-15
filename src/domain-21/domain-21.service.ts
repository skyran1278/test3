import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain21 } from './domain-21.entity';
import { Domain21Repository } from './domain-21.repository';
import { CreateDomain21Input } from './mutation/create-domain-21.input';
import { CreateDomain21sInput } from './mutation/create-domain-21s.input';
import { UpdateDomain21Input } from './mutation/update-domain-21.input';
import { Domain21PageArgs } from './query/domain-21-page.args';

@Injectable()
export class Domain21Service {
  constructor(private readonly repo: Domain21Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain21Input | UpdateDomain21Input,
  ): Promise<Domain21> {
    const domain21 = this.repo.create(input);
    await this.repo.save(domain21);

    return domain21;
  }

  @Transactional()
  async saveMany(input: CreateDomain21sInput): Promise<Domain21[]> {
    const domain21s = this.repo.create(input.domain21s);
    await this.repo.save(domain21s);

    return domain21s;
  }

  @Transactional()
  findPage(args: Domain21PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain21 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain21);
  }
}
