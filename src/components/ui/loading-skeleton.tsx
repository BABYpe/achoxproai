import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface LoadingSkeletonProps {
  type: 'card' | 'list' | 'profile';
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
  <div className="flex items-center space-x-4 space-x-reverse">
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