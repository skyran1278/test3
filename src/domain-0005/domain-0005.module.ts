import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain0006Module } from 'src/domain-0006/domain-0006.module';

import { Domain0005 } from './domain-0005.entity';
import { Domain0005Resolver } from './domain-0005.resolver';
import { Domain0005Service } from './domain-0005.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0005]), Domain0006Module],
  providers: [
    Domain0005Resolver,
    Domain0005Service,
    // Domain0005IdLoader,
    // Domain0005IdResolver,
  ],
})
export class Domain0005Module {}
