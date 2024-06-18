import { Test, TestingModule } from '@nestjs/testing';

import { PermissionActionEnum } from '../permission/permission-action.enum';
import { User } from '../user/user.entity';
import { CaslAbility, CaslAbilityFactory } from './casl-ability.factory';

describe('CaslAbilityFactory', () => {
  let service: CaslAbilityFactory;
  let ability: CaslAbility;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaslAbilityFactory],
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

    service = module.get<CaslAbilityFactory>(CaslAbilityFactory);

    const user = new User();
    user.id = '123';
    ability = await service.createAbilityFor(user);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can read any User', () => {
    expect(ability.can(PermissionActionEnum.READ, new User())).toBe(true);
  });

  it('can not create a User if the createdUserId is not set', () => {
    expect(ability.can(PermissionActionEnum.CREATE, new User())).toBe(false);
  });

  it('can create a User if the createdUserId is the same', () => {
    const createdUser = new User();
    createdUser.createdUserId = '123';
    expect(ability.can(PermissionActionEnum.CREATE, createdUser)).toBe(true);
  });
});
