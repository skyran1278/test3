import {
  MongoAbility,
  MongoQuery,
  RawRuleFrom,
  Subject,
  createMongoAbility,
} from '@casl/ability';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Maybe } from 'graphql/jsutils/Maybe';
import get from 'lodash/get';

import { CustomError } from '../error/custom.error';
import { ErrorReasonEnum } from '../error/error-reason.enum';
import { PermissionActionEnum } from '../permission/permission-action.enum';
import { PermissionRepository } from '../permission/permission.repository';
import { User } from '../user/user.entity';

type PossibleAbilities = [PermissionActionEnum, Subject];
type Conditions = MongoQuery;
export type CaslRules = RawRuleFrom<PossibleAbilities, Conditions>[];
export type CaslAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class AuthorizationFactory {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async createRulesFor(user: User): Promise<CaslRules> {
    const permissions = await this.permissionRepository.findBy({
      roles: {
        users: {
          id: user.id,
        },
      },
    });

    const caslPermissions = permissions.map((permission) => {
      return {
        ...permission,
        conditions: this.interpolate(permission.conditions, {
          user,
        }),
      };
    });

    return caslPermissions;
  }

  createAbilityFor(rules: CaslRules): CaslAbility {
    return createMongoAbility<CaslAbility>(rules);
  }

  interpolate(
    record: Maybe<Record<string, unknown>>,
    vars: Record<string, unknown>,
  ): Record<string, unknown> | undefined {
    if (!record) return undefined;

    for (const key in record) {
      const value = record[key];
      if (this.isRecord(value)) {
        record[key] = this.interpolate(value, vars);
      } else if (typeof value === 'string') {
        record[key] = this.replacePlaceholder(value, vars);
      }
    }

    return record;
  }

  private replacePlaceholder(
    str: string,
    vars: Record<string, unknown>,
  ): unknown {
    const key = /\${(.*?)}/g.exec(str)?.[1];

    if (key) {
      const value = get(vars, key);
      if (value === undefined) {
        throw new CustomError({
          message: `Can't find value for key "${key}" in Permission's Conditions`,
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          reason: ErrorReasonEnum.PERMISSION_INTERPOLATE_ERROR,
          detail: {
            key,
            vars,
          },
        });
      }
      return value;
    }

    return str;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
}
