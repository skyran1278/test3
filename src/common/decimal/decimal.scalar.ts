import Decimal from 'decimal.js';
import { GraphQLScalarType, Kind } from 'graphql';

const DecimalScalar = new GraphQLScalarType({
  name: 'Decimal',

  description:
    'A decimal string, such as 1.234, compliant with decimal.js format.',

  serialize(outputValue: unknown): string {
    if (!(outputValue instanceof Decimal)) {
      throw new TypeError('Decimal cannot represent non Decimal type');
    }
    return outputValue.toString();
  },

  parseValue(inputValue: unknown): Decimal {
    if (typeof inputValue !== 'string') {
      throw new TypeError('Decimal cannot represent non string type');
    }
    return new Decimal(inputValue);
  },

  parseLiteral(valueNode): Decimal | null {
    if (valueNode.kind !== Kind.STRING) {
      throw new TypeError('Decimal cannot represent non string type');
    }
    return new Decimal(valueNode.value);
  },
});

export default DecimalScalar;
