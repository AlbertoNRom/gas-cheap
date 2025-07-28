import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted/50',
        className
      )}
    />
  );
}

export function GasStationSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }, () => crypto.randomUUID()).map((id) => (
        <div key={id} className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, () => crypto.randomUUID()).map((starId) => (
                <Skeleton key={starId} className="h-4 w-4 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PrioritySelectorSkeleton() {
  return (
    <div className="border border-border rounded-lg p-6">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-3 w-32" />
          </div>
          
          <Skeleton className="h-6 w-11 rounded-full" />
          
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2 justify-end">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}