import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Permission } from './permission.entity';
import { PermissionRepository } from './permission.repository';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [
    PermissionRepository,
    PermissionService,
    PermissionResolver,
    // PermissionByIdLoader,
    // PermissionByIdResolver,
  ],
  exports: [PermissionRepository],
})
export class PermissionModule {}
