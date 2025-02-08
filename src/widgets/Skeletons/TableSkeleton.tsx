import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="w-full p-4">
      <div className="w-full border rounded-lg overflow-hidden shadow-md">
        {/* Table Header Skeleton */}
        <div className="dark:bg-gray-900 p-3">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-1/5" />
            <Skeleton className="h-5 w-1/5" />
            <Skeleton className="h-5 w-1/5" />
            <Skeleton className="h-5 w-1/5" />
          </div>
        </div>

        {/* Table Rows Skeleton */}
        <div className="divide-y">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-3 flex justify-between items-center">
              <Skeleton className="h-4 w-1/5" />
              <Skeleton className="h-4 w-1/5" />
              <Skeleton className="h-4 w-1/5" />
              <Skeleton className="h-4 w-1/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;