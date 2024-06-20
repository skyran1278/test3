import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CustomError } from '../error/custom.error';
import { ErrorReasonEnum } from '../error/error-reason.enum';
import { PermissionActionEnum } from '../permission/permission-action.enum';
import { User } from '../user/user.entity';
import { AuthorizationFactory, CaslAbility } from './authorization.factory';

describe('AuthorizationFactory', () => {
  let service: AuthorizationFactory;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizationFactory],
    })
      .useMocker(() => ({
        findBy: () => [
          {
            action: 'manage',
            subject: 'User',
            conditions: {
              createdUserId: '${user.id}',
            },
          },
          {
            action: 'read',
            subject: 'User',
            conditions: null,
          },
        ],
      }))
      .compile();

    service = module.get<AuthorizationFactory>(AuthorizationFactory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('interpolate', () => {
    const vars = { user: { id: '123' }, userIds: ['123', '456'] };

    it('should handle null', () => {
      const conditions = service.interpolate(null, vars);
      expect(conditions).toEqual(undefined);
    });

    it('should interpolate user.id', () => {
      const conditions = service.interpolate(
        {
          createdUserId: '${user.id}',
        },
        vars,
      );
      expect(conditions).toEqual({ createdUserId: '123' });
    });

    it('should interpolate userIds', () => {
      const conditions = service.interpolate(
        {
          createdUserId: { $in: '${userIds}' },
        },
        vars,
      );
      expect(conditions).toEqual({ createdUserId: { $in: ['123', '456'] } });
    });

    it('should throw Error', () => {
      try {
        service.interpolate(
          {
            foo: '${bar}',
          },
          vars,
        );
      } catch (error) {
        const e = error as CustomError;
        expect(e.getResponse()).toEqual({
          message: `Can't find value for key "bar" in Permission's Conditions`,
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          reason: ErrorReasonEnum.PERMISSION_INTERPOLATE_ERROR,
          detail: {
            key: 'bar',
            vars,
          },
        });
        expect(e.stack).toBeDefined();
      }
    });
  });

  describe('ability', () => {
    let ability: CaslAbility;

    beforeAll(async () => {
      const user = new User();
      user.id = '123';
      const rules = await service.createRulesFor(user);
      ability = service.createAbilityFor(rules);
    });

    it('can read any User', () => {
      expect(ability.can(PermissionActionEnum.READ, new User())).toBe(true);
    });

    it('can not create a User if the createdUserId is not set', () => {
      expect(ability.can(PermissionActionEnum.CREATE, new User())).toBe(false);
    });

    it('can create a User if the createdUserId is the same', () => {
      const user = new User();
      user.createdUserId = '123';
      expect(ability.can(PermissionActionEnum.CREATE, user)).toBe(true);
    });
  });
});
