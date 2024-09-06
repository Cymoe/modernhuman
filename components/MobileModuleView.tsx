'use client'

import { Module } from '@/types/courseTypes'
import { ProgressWithText } from "@/components/ui/progress-with-text"
import { CheckCircle } from 'lucide-react'

interface Props {
  module: Module
  onLessonClick: (lessonId: number) => void
}

export default function MobileModuleView({ module, onLessonClick }: Props) {
  return (
    <div className="w-full bg-black overflow-y-auto text-[rgb(75,85,99)] rounded-xl">
      <div className="p-4 mt-8">
        <h2 className="text-xl font-bold text-gray-300 mb-2">{module.title}</h2>
        <ProgressWithText value={module.progress} className="mt-2 mb-4" />
      </div>
      <nav>
        <ul>
          {module.lessons.map((lesson) => (
            <li key={lesson.id}>
              <button 
                onClick={() => onLessonClick(lesson.id)}
                className="flex items-center justify-between p-3 transition-colors rounded-xl border w-full text-left border-transparent hover:border-blue-600"
              >
                <span>{lesson.title}</span>
                {lesson.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
