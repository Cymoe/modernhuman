import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
}

export default function CourseCard({ id, title, description, image, progress }: CourseCardProps) {
  return (
    <Link to={`/courses/${id}`} className="block">
      <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden transition-all hover:ring-2 hover:ring-blue-500">
        <div className="h-40 sm:h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">{description}</p>
          <div className="relative w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{progress}% Complete</p>
        </div>
      </div>
    </Link>
  );
}