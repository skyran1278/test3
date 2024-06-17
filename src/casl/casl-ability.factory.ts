import {
  MongoAbility,
  MongoQuery,
  Subject,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Maybe } from 'graphql/jsutils/Maybe';

import { PermissionActionEnum } from '../permission/permission-action.enum';
import { PermissionRepository } from '../permission/permission.repository';
import { User } from '../user/user.entity';

type PossibleAbilities = [PermissionActionEnum, Subject];
type Conditions = MongoQuery;
export type CaslAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async createAbilityFor(user: User) {
    const permissions = await this.permissionRepository.findBy({
      roles: {
        users: {
          id: user.id,
        },
      },
    });

    const caslPermissions = permissions.map((permission) => {
      permission.conditions = interpolate(permission.conditions, {
        userIds: [user.id],
      });
      return permission;
    });

    return createMongoAbility<CaslAbility>(caslPermissions);
  }
}

function interpolate(
  conditions: Maybe<Record<string, unknown>>,
  vars: Record<string, unknown>,
): Record<string, unknown> | undefined {
  if (!conditions) return undefined;

  for (const key in conditions) {
    if (typeof conditions[key] === 'object') {
      conditions[key] = interpolate(
        conditions[key] as Record<string, unknown>,
        vars,
      );
    } else if (typeof conditions[key] === 'string') {
      conditions[key] = replacePlaceholder(conditions[key] as string, vars);
    }
  }

  return conditions;
}

function replacePlaceholder(
  str: string,
  vars: Record<string, unknown>,
): unknown {
  const key = /\${(.*?)}/g.exec(str)?.[1];

  if (key) {
    return vars[key];
  }

  return str;
}
