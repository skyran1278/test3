import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0010Module } from '../domain-0010/domain-0010.module';
import { Domain0009ByIdLoader } from './domain-0009-by-id.loader';
import { Domain0009ByIdResolver } from './domain-0009-by-id.resolver';
import { Domain0009 } from './domain-0009.entity';
import { Domain0009Resolver } from './domain-0009.resolver';
import { Domain0009Service } from './domain-0009.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0009]), Domain0010Module],
  providers: [
    Domain0009Service,
    Domain0009Resolver,
    Domain0009ByIdLoader,
    Domain0009ByIdResolver,
  ],
  exports: [Domain0009Service],
})
export class Domain0009Module {}
