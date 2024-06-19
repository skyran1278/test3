import { registerEnumType } from '@nestjs/graphql';

export enum PermissionActionEnum {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

registerEnumType(PermissionActionEnum, {
  name: 'PermissionActionEnum',
});
