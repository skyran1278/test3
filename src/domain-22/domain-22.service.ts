import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain22 } from './domain-22.entity';
import { Domain22Repository } from './domain-22.repository';
import { CreateDomain22Input } from './mutation/create-domain-22.input';
import { CreateDomain22sInput } from './mutation/create-domain-22s.input';
import { UpdateDomain22Input } from './mutation/update-domain-22.input';
import { Domain22PageArgs } from './query/domain-22-page.args';

@Injectable()
export class Domain22Service {
  constructor(private readonly repo: Domain22Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain22Input | UpdateDomain22Input,
  ): Promise<Domain22> {
    const domain22 = this.repo.create(input);
    await this.repo.save(domain22);

    return domain22;
  }

  @Transactional()
  async saveMany(input: CreateDomain22sInput): Promise<Domain22[]> {
    const domain22s = this.repo.create(input.domain22s);
    await this.repo.save(domain22s);

    return domain22s;
  }

  @Transactional()
  findPage(args: Domain22PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain22 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain22);
  }
}
