"use client";

import { useState, useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export function useQueryState<T extends string>(
  key: string,
  initialValue: T
): [T, (newValue: T) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, setState] = useState<T>(
    (searchParams.get(key) as T) || initialValue
  );

  const [debouncedState] = useDebounce(state, 300);

  const setQueryState = useCallback((newValue: T) => {
    setState(newValue);
  }, []);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!debouncedState) {
      current.delete(key);
    } else {
      current.set(key, debouncedState);
    }
    
    const search = current.toString();
    const query = search ? `?${search}` : "";

    // Only push new state to history if the query has actually changed
    if(searchParams.toString() !== current.toString()) {
        router.push(`${pathname}${query}`);
    }

  }, [debouncedState, key, pathname, router, searchParams]);

  return [state, setQueryState];
}
