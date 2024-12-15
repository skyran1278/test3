import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain25 } from './domain-25.entity';
import { Domain25Repository } from './domain-25.repository';
import { CreateDomain25Input } from './mutation/create-domain-25.input';
import { UpdateDomain25Input } from './mutation/update-domain-25.input';
import { Domain25PageArgs } from './query/domain-25-page.args';

@Injectable()
export class Domain25Service {
  constructor(private readonly repo: Domain25Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain25Input | UpdateDomain25Input,
  ): Promise<Domain25> {
    const domain25 = this.repo.create(input);
    await this.repo.save(domain25);

    return domain25;
  }

  @Transactional()
  findPage(args: Domain25PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain25 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain25);
  }
}
