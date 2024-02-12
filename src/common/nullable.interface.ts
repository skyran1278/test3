export type NullableProperty<Property> = Property extends Record<
  string,
  unknown
>
  ? Nullable<Property>
  : Property | null;

export type Nullable<T> = {
  [P in keyof T]?: NullableProperty<T[P]>;
};
