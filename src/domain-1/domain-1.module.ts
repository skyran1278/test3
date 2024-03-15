import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain1 } from './domain-1.entity';
import { Domain1Resolver } from './domain-1.resolver';
import { Domain1Service } from './domain-1.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain1])],
  providers: [
    Domain1Resolver,
    Domain1Service,
    // Domain1IdLoader,
    // Domain1IdResolver,
  ],
})
export class Domain1Module {}
