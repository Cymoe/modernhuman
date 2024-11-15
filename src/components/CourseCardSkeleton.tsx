export default function CourseCardSkeleton() {
  return (
    <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden animate-pulse">
      <div className="h-40 sm:h-48 bg-gray-200 dark:bg-zinc-800" />
      <div className="p-4 sm:p-6">
        <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-5/6" />
        </div>
        <div className="mt-4">
          <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full w-full" />
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-16 mt-2" />
        </div>
      </div>
    </div>
  );
}