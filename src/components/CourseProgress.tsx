interface CourseProgressProps {
  progress: number;
  className?: string;
}

export default function CourseProgress({ progress, className = '' }: CourseProgressProps) {
  return (
    <div className={className}>
      <div className="relative w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{progress}% Complete</p>
    </div>
  );
}