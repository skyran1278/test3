import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0025Module } from '../domain-0025/domain-0025.module';
import { Domain0024 } from './domain-0024.entity';
import { Domain0024Repository } from './domain-0024.repository';
import { Domain0024Resolver } from './domain-0024.resolver';
import { Domain0024Service } from './domain-0024.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0024]), Domain0025Module],
  providers: [
    Domain0024Repository,
    Domain0024Service,
    Domain0024Resolver,
    // Domain0024ByIdLoader,
    // Domain0024ByIdResolver,
  ],
})
export class Domain0024Module {}
