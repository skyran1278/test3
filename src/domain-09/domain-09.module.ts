import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain10Module } from '../domain-10/domain-10.module';
import { Domain09ByIdLoader } from './domain-09-by-id.loader';
import { Domain09ByIdResolver } from './domain-09-by-id.resolver';
import { Domain09 } from './domain-09.entity';
import { Domain09Repository } from './domain-09.repository';
import { Domain09Resolver } from './domain-09.resolver';
import { Domain09Service } from './domain-09.service';
import { Domain09sByDomain08IdLoader } from './domain-09s-by-domain-08-id.loader';
import { Domain09sByDomain08IdResolver } from './domain-09s-by-domain-08-id.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Domain09]), Domain10Module],
  providers: [
    Domain09Repository,
    Domain09Service,
    Domain09Resolver,
    Domain09ByIdLoader,
    Domain09ByIdResolver,
    Domain09sByDomain08IdLoader,
    Domain09sByDomain08IdResolver,
  ],
  exports: [Domain09Repository],
})
export class Domain09Module {}
