import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0009Module } from '../domain-0009/domain-0009.module';
import { Domain0008 } from './domain-0008.entity';
import { Domain0008Repository } from './domain-0008.repository';
import { Domain0008Resolver } from './domain-0008.resolver';
import { Domain0008Service } from './domain-0008.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0008]), Domain0009Module],
  providers: [
    Domain0008Repository,
    Domain0008Service,
    Domain0008Resolver,
    // Domain0008ByIdLoader,
    // Domain0008ByIdResolver,
  ],
})
export class Domain0008Module {}
