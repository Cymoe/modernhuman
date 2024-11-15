import { Lesson, Module } from '../types';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface CourseSidebarProps {
  modules: Module[];
  onSelectLesson: (lesson: Lesson) => void;
  currentLessonId: string;
  courseTitle: string;
}

export default function CourseSidebar({ modules, onSelectLesson, currentLessonId, courseTitle }: CourseSidebarProps) {
  return (
    <div className="bg-gray-100 dark:bg-zinc-900 w-full h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">{courseTitle}</h2>
        <div className="space-y-6">
          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="space-y-2">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">
                Module {moduleIndex + 1}: {module.title}
              </div>
              <div className="space-y-1">
                {module.lessons.map((lesson, lessonIndex) => (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    className={`w-full text-left p-3 text-sm rounded-lg transition-colors ${
                      currentLessonId === lesson.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span>{lessonIndex + 1}. {lesson.title}</span>
                        {lesson.completed && (
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <span className="text-xs opacity-75">{lesson.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}