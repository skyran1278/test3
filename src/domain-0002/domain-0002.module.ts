import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0003Module } from 'src/domain-0003/domain-0003.module';
import { Domain0002IdLoader } from './domain-0002-id.loader';
import { Domain0002IdResolver } from './domain-0002-id.resolver';
import { Domain0002 } from './domain-0002.entity';
import { Domain0002Resolver } from './domain-0002.resolver';
import { Domain0002Service } from './domain-0002.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0002]), Domain0003Module],
  providers: [
    Domain0002Service,
    Domain0002Resolver,
    Domain0002IdLoader,
    Domain0002IdResolver,
  ],
})
export class Domain0002Module {}
