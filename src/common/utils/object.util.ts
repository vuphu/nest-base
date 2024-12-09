import _ from 'lodash';
import { isArray, isObject, map } from 'lodash';

export function transform(value: any, transformer: (v: string) => string): any {
  if (isArray(value)) {
    return map(value, (item) => transform(item, transformer));
  }

  if (isObject(value)) {
    return _(value)
      .mapKeys((_, k) => transformer(k))
      .mapValues((v) => transform(v, transformer))
      .value();
  }

  return value;
}
