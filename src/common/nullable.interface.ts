import { Maybe } from 'graphql/jsutils/Maybe';

export type NullableProperty<Property> =
  Property extends Record<string, unknown>
    ? DeepNullable<Property>
    : Property | null;

export type DeepNullable<T> = {
  [P in keyof T]?: NullableProperty<T[P]>;
};

export type Nullable<T> = {
  [P in keyof T]?: Maybe<T[P]>;
};

export type NonNullableProperty<Property> =
  Property extends Record<string, unknown>
    ? DeepNonNullable<Property>
    : NonNullable<Property>;

export type DeepNonNullable<T> = {
  [P in keyof T]?: NonNullableProperty<T[P]>;
};
