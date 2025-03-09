import { omitBy } from 'lodash';

export const removeEmptyKeys = <T>(obj: Record<string, unknown>): T => {
  return omitBy(
    obj,
    (value: unknown) => value === undefined || value === ''
  ) as T;
};
