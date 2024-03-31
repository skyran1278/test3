import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain4 } from './domain-4.entity';
import { Domain4Resolver } from './domain-4.resolver';
import { Domain4Service } from './domain-4.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain4])],
  providers: [
    Domain4Resolver,
    Domain4Service,
    // Domain4IdLoader,
    // Domain4IdResolver,
  ],
})
export class Domain4Module {}
