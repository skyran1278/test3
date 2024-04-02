import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0007 } from './domain-0007.entity';
import { Domain0007Service } from './domain-0007.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0007])],
  providers: [
    // Domain0007Resolver,
    Domain0007Service,
    // Domain0007IdLoader,
    // Domain0007IdResolver,
  ],
})
export class Domain0007Module {}
