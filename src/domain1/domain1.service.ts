import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Domain1 } from './domain1.entity';
import { CreateDomain1Input } from './mutation/create-domain1.input';
import { UpdateDomain1Input } from './mutation/update-domain1.input';

@Injectable()
export class Domain1Service {
  constructor(
    @InjectRepository(Domain1)
    private readonly domain1Repo: Repository<Domain1>,
  ) {}

  create(createDomain1Input: CreateDomain1Input) {
    const domain1 = this.domain1Repo.create(createDomain1Input);
    return this.domain1Repo.save(domain1);
  }

  findAll() {
    return this.domain1Repo.find();
  }

  findOne(id: number) {
    return this.domain1Repo.findOneBy({ id });
  }

  async update(id: number, updateDomain1Input: UpdateDomain1Input) {
    const domain1 = await this.domain1Repo.findOneByOrFail({ id });
    domain1.domain1001 = updateDomain1Input.domain1001;
    await this.domain1Repo.save(domain1);
    return domain1;
  }

  async remove(id: number) {
    const domain1 = await this.domain1Repo.findOneByOrFail({ id });
    await this.domain1Repo.softRemove(domain1);
    return domain1;
  }
}
