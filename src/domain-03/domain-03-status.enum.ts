import { registerEnumType } from '@nestjs/graphql';

/**
 * Avoid using PascalCase and camelCase, as wildcard searches are not convenient with these conventions.
 * Also, avoid snake_case since it's not a standard convention in TypeScript.
 * I prefer the key and value to be identical;
 * therefore, I use UPPERCASE_SNAKE_CASE.
 */
export enum Domain03StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

registerEnumType(Domain03StatusEnum, {
  name: 'Domain03StatusEnum',
  description: 'status',
});
