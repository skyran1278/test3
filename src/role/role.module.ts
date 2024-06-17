import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './role.entity';
import { RoleRepository } from './role.repository';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [
    RoleRepository,
    RoleService,
    RoleResolver,
    // RoleByIdLoader,
    // RoleByIdResolver,
  ],
})
export class RoleModule {}
