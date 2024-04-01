import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain0010Module } from 'src/domain-0010/domain-0010.module';

import { Domain0009IdLoader } from './domain-0009-id.loader';
import { Domain0009IdResolver } from './domain-0009-id.resolver';
import { Domain0009 } from './domain-0009.entity';
import { Domain0009Resolver } from './domain-0009.resolver';
import { Domain0009Service } from './domain-0009.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0009]), Domain0010Module],
  providers: [
    Domain0009Service,
    Domain0009Resolver,
    Domain0009IdLoader,
    Domain0009IdResolver,
  ],
})
export class Domain0009Module {}
