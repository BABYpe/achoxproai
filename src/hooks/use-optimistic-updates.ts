"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';

// This is a generic hook for optimistic updates.
// It assumes a common pattern where you have a query key for a list of items
// and you want to optimistically update this list when adding/updating/deleting an item.

interface OptimisticUpdateProps<TData, TNew, TQueryKey> {
  queryKey: TQueryKey[];
  mutationFn: (newData: TNew) => Promise<TData>;
  updateFn: (oldData: TData[] | undefined, newData: TNew) => TData[];
}

export function useOptimisticUpdate<TData, TNew, TQueryKey>({
  queryKey,
  mutationFn,
  updateFn,
}: OptimisticUpdateProps<TData, TNew, TQueryKey>) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    onMutate: async (newData: TNew) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData[]>(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old: TData[] | undefined) => updateFn(old, newData));

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newData, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return mutation;
}