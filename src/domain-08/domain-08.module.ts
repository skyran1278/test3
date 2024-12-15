import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain09Module } from '../domain-09/domain-09.module';
import { Domain08 } from './domain-08.entity';
import { Domain08Repository } from './domain-08.repository';
import { Domain08Resolver } from './domain-08.resolver';
import { Domain08Service } from './domain-08.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain08]), Domain09Module],
  providers: [
    Domain08Repository,
    Domain08Service,
    Domain08Resolver,
    // Domain08ByIdLoader,
    // Domain08ByIdResolver,
  ],
})
export class Domain08Module {}
