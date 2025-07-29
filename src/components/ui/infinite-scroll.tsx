"use client";

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import React, { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  loader?: React.ReactNode;
}

export function InfiniteScroll({
  children,
  onLoadMore,
  hasMore,
  isLoading,
  loader,
}: InfiniteScrollProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(loadMoreRef, { threshold: 1 });

  useEffect(() => {
    if (entry?.isIntersecting && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [entry, onLoadMore, hasMore, isLoading]);

  const defaultLoader = (
    <div className="flex justify-center items-center p-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <>
      {children}
      <div ref={loadMoreRef} className="h-1" />
      {isLoading && (loader ?? defaultLoader)}
    </>
  );
}