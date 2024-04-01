import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0005Module } from 'src/domain-0005/domain-0005.module';
import { Domain0004 } from './domain-0004.entity';
import { Domain0004Resolver } from './domain-0004.resolver';
import { Domain0004Service } from './domain-0004.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0004]), Domain0005Module],
  providers: [
    Domain0004Resolver,
    Domain0004Service,
    // Domain0004IdLoader,
    // Domain0004IdResolver,
  ],
})
export class Domain0004Module {}
