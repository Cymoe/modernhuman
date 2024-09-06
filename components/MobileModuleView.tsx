import { useRouter } from 'next/navigation'
import { Module } from '@/types/courseTypes'
import ProgressBar from './ProgressBar'

interface Props {
  module: Module
}

export default function MobileModuleView({ module }: Props) {
  const router = useRouter()

  const handleLessonClick = (lessonId: number) => {
    router.push(`/module/${module.id}/lesson/${lessonId}`)
  }

  return (
    <div className="p-4 bg-red-100"> {/* Add a background color for testing */}
      <h1 className="text-2xl font-bold mb-4">Mobile View: {module.title}</h1>
      <ProgressBar progress={module.progress} />
      <ul className="mt-4">
        {module.lessons.map((lesson) => (
          <li 
            key={lesson.id} 
            className="py-3 border-b last:border-b-0"
            onClick={() => handleLessonClick(lesson.id)}
          >
            <div className="flex items-center">
              <span className="flex-grow">{lesson.title}</span>
              {lesson.completed && (
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
