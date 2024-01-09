import Decimal from 'decimal.js';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  static transformer = new DecimalTransformer();

  private constructor() {
    // noop
  }

  to(value: Maybe<Decimal>): string | null {
    if (value == null) {
      return null;
    }

    return new Decimal(value).toFixed();
  }

  from(value: string | null): Decimal | null {
    if (value === null) {
      return null;
    }

    return new Decimal(value);
  }
}
