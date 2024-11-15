export default function CourseDetailSkeleton() {
  return (
    <div className="h-[calc(100vh-73px)] relative">
      <div className="max-w-[1200px] mx-auto h-full flex flex-col md:flex-row">
        {/* Sidebar Skeleton */}
        <div className="hidden md:block md:w-[300px] md:border-r border-zinc-800">
          <div className="h-full bg-gray-100 dark:bg-zinc-900 p-4">
            <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-6" />
            <div className="space-y-6">
              {[1, 2].map((module) => (
                <div key={module} className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2" />
                  <div className="space-y-2">
                    {[1, 2].map((lesson) => (
                      <div
                        key={lesson}
                        className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 p-4 md:p-6">
          <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-200 dark:bg-zinc-800" />
            <div className="p-4 sm:p-6">
              <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}