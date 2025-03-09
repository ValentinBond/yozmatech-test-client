import { useState, useEffect, useMemo } from 'react';

import debounce from 'lodash/debounce';

export function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedSetter = useMemo(
    () => debounce(setDebouncedValue, delay),
    [delay]
  );

  useEffect(() => {
    debouncedSetter(value);

    return () => {
      debouncedSetter.cancel();
    };
  }, [value, debouncedSetter]);

  return debouncedValue;
}
