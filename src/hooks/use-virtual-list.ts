"use client";

import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';

interface UseVirtualListProps<T> {
  data: T[];
  containerRef: React.RefObject<HTMLElement>;
  estimateSize?: (index: number) => number;
}

export function useVirtualList<T>({
  data,
  containerRef,
  estimateSize = () => 50, // Default estimated size for each item
}: UseVirtualListProps<T>) {
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => containerRef.current,
    estimateSize,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  return {
    virtualItems,
    totalSize: rowVirtualizer.getTotalSize(),
  };
}