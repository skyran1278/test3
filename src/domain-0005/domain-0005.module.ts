import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain0006Module } from 'src/domain-0006/domain-0006.module';
import { Domain0007Module } from 'src/domain-0007/domain-0007.module';

import { Domain0005 } from './domain-0005.entity';
import { Domain0005Resolver } from './domain-0005.resolver';
import { Domain0005Service } from './domain-0005.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Domain0005]),
    Domain0006Module,
    Domain0007Module,
  ],
  providers: [
    Domain0005Resolver,
    Domain0005Service,
    // Domain0005ByIdLoader,
    // Domain0005ByIdResolver,
  ],
})
export class Domain0005Module {}
