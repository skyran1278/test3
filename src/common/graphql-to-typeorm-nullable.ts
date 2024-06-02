import { FieldOptions } from '@nestjs/graphql';

export function graphqlToTypeormNullable(
  nullable: FieldOptions['nullable'],
): boolean | undefined {
  return nullable === 'items' || nullable === 'itemsAndList' ? false : nullable;
}
