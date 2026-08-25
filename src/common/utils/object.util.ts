import _, { isArray, isObject, map } from 'lodash';

type Transformer = (v: string) => string;
type Transformable = object | object[];

export function transform<I extends Transformable, O extends Transformable>(value: I, transformer: Transformer): O {
  if (isArray(value)) {
    return map(value, (item) => transform(item as Transformable, transformer)) as O;
  }

  if (isObject(value)) {
    return _(value)
      .mapKeys((_, k) => transformer(k))
      .mapValues((v) => transform(v as Transformable, transformer))
      .value() as O;
  }

  return value;
}
