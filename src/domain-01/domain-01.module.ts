import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain01 } from './domain-01.entity';
import { Domain01Repository } from './domain-01.repository';
import { Domain01Resolver } from './domain-01.resolver';
import { Domain01Service } from './domain-01.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain01])],
  providers: [
    Domain01Repository,
    Domain01Service,
    Domain01Resolver,
    // Domain01ByIdLoader,
    // Domain01ByIdResolver,
  ],
})
export class Domain01Module {}
