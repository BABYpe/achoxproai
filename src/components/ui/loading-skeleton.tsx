
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import React from "react";

interface LoadingSkeletonProps {
  type: 'card' | 'list' | 'profile' | 'full-page';
  count?: number;
  className?: string;
}

const CardSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

const ListSkeleton = () => (
  <div className="flex items-center space-x-4 space-x-reverse p-2">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

const ProfileSkeleton = () => (
    <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
    </div>
)

const FullPageSkeleton = () => (
    <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-12 w-48" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <Skeleton className="lg:col-span-3 h-[300px] rounded-2xl" />
            <Skeleton className="lg:col-span-2 h-[300px] rounded-2xl" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
            <Skeleton className="h-[400px] rounded-2xl" />
            <Skeleton className="h-[400px] rounded-2xl" />
        </div>
    </div>
);


export function LoadingSkeleton({ type, count = 1, className }: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return <CardSkeleton />;
      case 'list':
        return <ListSkeleton />;
      case 'profile':
        return <ProfileSkeleton />;
      case 'full-page':
        return <FullPageSkeleton />;
      default:
        return <Skeleton className="h-10 w-full" />;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </div>
  );
}
