"use client";

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

interface UseDebouncedSearchProps<T> {
  searchFunction: (query: string) => Promise<T[]>;
  initialQuery?: string;
  delay?: number;
}

export function useDebouncedSearch<T>({
  searchFunction,
  initialQuery = '',
  delay = 500,
}: UseDebouncedSearchProps<T>) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, delay);
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery) {
        setIsLoading(true);
        try {
          const searchResults = await searchFunction(debouncedQuery);
          setResults(searchResults);
        } catch (error) {
          console.error("Search failed:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    performSearch();
  }, [debouncedQuery, searchFunction]);

  return {
    query,
    setQuery,
    results,
    isLoading,
  };
}