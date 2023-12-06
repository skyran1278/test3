import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain1 } from './domain1.entity';
import { Domain1Resolver } from './domain1.resolver';
import { Domain1Service } from './domain1.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain1])],
  providers: [Domain1Resolver, Domain1Service],
})
export class Domain1Module {}
