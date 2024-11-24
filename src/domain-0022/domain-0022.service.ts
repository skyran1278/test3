import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0022 } from './domain-0022.entity';
import { Domain0022Repository } from './domain-0022.repository';
import { CreateDomain0022Input } from './mutation/create-domain-0022.input';
import { CreateDomain0022sInput } from './mutation/create-domain-0022s.input';
import { UpdateDomain0022Input } from './mutation/update-domain-0022.input';
import { Domain0022PageArgs } from './query/domain-0022-page.args';

@Injectable()
export class Domain0022Service {
  constructor(private readonly repo: Domain0022Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0022Input | UpdateDomain0022Input,
  ): Promise<Domain0022> {
    const domain0022 = await this.repo.save(input);

    return domain0022;
  }

  @Transactional()
  async saveMany(input: CreateDomain0022sInput): Promise<Domain0022[]> {
    const domain0022s = await this.repo.save(input.domain0022s);

    return domain0022s;
  }

  @Transactional()
  findPage(args: Domain0022PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0022 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0022);
  }
}
