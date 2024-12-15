import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain25Module } from '../domain-25/domain-25.module';
import { Domain24 } from './domain-24.entity';
import { Domain24Repository } from './domain-24.repository';
import { Domain24Resolver } from './domain-24.resolver';
import { Domain24Service } from './domain-24.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain24]), Domain25Module],
  providers: [
    Domain24Repository,
    Domain24Service,
    Domain24Resolver,
    // Domain24ByIdLoader,
    // Domain24ByIdResolver,
  ],
})
export class Domain24Module {}
