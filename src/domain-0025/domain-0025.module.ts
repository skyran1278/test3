import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0025 } from './domain-0025.entity';
import { Domain0025Repository } from './domain-0025.repository';
import { Domain0025Resolver } from './domain-0025.resolver';
import { Domain0025Service } from './domain-0025.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0025])],
  providers: [
    Domain0025Repository,
    Domain0025Service,
    Domain0025Resolver,
    // Domain0025ByIdLoader,
    // Domain0025ByIdResolver,
  ],
  exports: [Domain0025Repository],
})
export class Domain0025Module {}
