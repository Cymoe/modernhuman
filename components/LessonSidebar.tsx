'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { useParams } from "next/navigation"
import { useProgress } from "@/app/contexts/ProgressContext"
import { CheckCircle } from 'lucide-react'
import { ProgressWithText } from "@/components/ui/progress-with-text"

type LessonSidebarProps = {
  moduleId: number
  lessons: any[]
  moduleTitle: string
  onLessonClick?: (lessonId: number) => void
  currentLessonId: number | null
  className?: string
  progressPercentage: number
}

const LessonSidebar = React.memo(({ moduleId, lessons, moduleTitle, onLessonClick, currentLessonId, className = '' }: LessonSidebarProps) => {
  const { progress } = useProgress()

  const { progressPercentage, completedLessons } = useMemo(() => {
    const moduleProgress = progress[moduleId.toString()] || {}
    const completedLessonsCount = Object.values(moduleProgress).filter(Boolean).length
    const progressPercentage = (completedLessonsCount / lessons.length) * 100
    return { progressPercentage, completedLessons: moduleProgress }
  }, [progress, moduleId, lessons.length])

  return (
    <div className={`w-full lg:w-96 bg-black overflow-y-auto text-[rgb(75,85,99)] rounded-xl lg:fixed ${className}`}>
      <div className="p-4 mt-4">
        <h2 className="text-xl font-bold text-gray-300 mb-2">{moduleTitle}</h2>
        <ProgressWithText value={progressPercentage} text={`${Math.round(progressPercentage)}%`} className="mt-2 mb-4" />
      </div>
      <nav>
        <ul>
          {lessons.map((lesson) => {
            const isCompleted = completedLessons[lesson.id.toString()] || false
            return (
              <li key={lesson.id}>
                {onLessonClick ? (
                  <button 
                    onClick={() => onLessonClick(lesson.id)}
                    className={`flex items-center justify-between p-3 transition-colors rounded-xl border w-full text-left ${
                      currentLessonId === lesson.id 
                        ? 'border-[rgb(75,85,99)] text-[rgb(75,85,99)]' 
                        : 'border-transparent hover:border-blue-600'
                    }`}
                  >
                    <span>{lesson.title}</span>
                    {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </button>
                ) : (
                  <Link 
                    href={`/module/${moduleId}/lesson/${lesson.id}`}
                    className={`flex items-center justify-between p-3 transition-colors rounded-xl border ${
                      currentLessonId === lesson.id 
                        ? 'border-[rgb(75,85,99)] text-[rgb(75,85,99)]' 
                        : 'border-transparent hover:border-blue-600'
                    }`}
                  >
                    <span>{lesson.title}</span>
                    {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
})

LessonSidebar.displayName = 'LessonSidebar'

export default LessonSidebar
