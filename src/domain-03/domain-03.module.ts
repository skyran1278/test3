import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain03 } from './domain-03.entity';
import { Domain03Repository } from './domain-03.repository';
import { Domain03Resolver } from './domain-03.resolver';
import { Domain03Service } from './domain-03.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain03])],
  providers: [
    Domain03Repository,
    Domain03Service,
    Domain03Resolver,
    // Domain03ByIdLoader,
    // Domain03ByIdResolver,
  ],
})
export class Domain03Module {}
