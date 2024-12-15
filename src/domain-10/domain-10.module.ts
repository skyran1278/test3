import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain10 } from './domain-10.entity';
import { Domain10Repository } from './domain-10.repository';
import { Domain10Service } from './domain-10.service';
import { Domain10sByDomain09IdLoader } from './domain-10s-by-domain-09-id.loader';
import { Domain10sByDomain09IdResolver } from './domain-10s-by-domain-09-id.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Domain10])],
  providers: [
    Domain10Repository,
    Domain10Service,
    Domain10sByDomain09IdLoader,
    Domain10sByDomain09IdResolver,
    // Domain10Resolver,
    // Domain10ByIdLoader,
    // Domain10ByIdResolver,
  ],
  exports: [Domain10Repository],
})
export class Domain10Module {}
