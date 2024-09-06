'use client'

import React, { useMemo, useEffect, useRef } from 'react'
import { Module } from '@/types/courseTypes'
import { ProgressWithText } from "@/components/ui/progress-with-text"
import { CheckCircle } from 'lucide-react'
import { useProgress } from "@/app/contexts/ProgressContext"

interface Props {
  module: Module
  onLessonClick: (lessonId: number) => void
}

const MobileModuleView: React.FC<Props> = React.memo(({ module, onLessonClick }) => {
  const { progress, isLoading } = useProgress()
  const componentRef = useRef<HTMLDivElement>(null)

  const { moduleProgress, progressPercentage } = useMemo(() => {
    const moduleProgress = progress[module.id.toString()] || {}
    const completedLessons = Object.values(moduleProgress).filter(Boolean).length
    const progressPercentage = (completedLessons / module.lessons.length) * 100
    return { moduleProgress, progressPercentage }
  }, [progress, module.id, module.lessons.length])

  useEffect(() => {
    // Delay the scroll to ensure content is rendered
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div ref={componentRef} className="w-full bg-black overflow-y-auto text-[rgb(75,85,99)] rounded-xl">
      <div className="p-2 mt-[3rem]">
        <h2 className="text-xl font-bold text-gray-300 mb-2">{module.title}</h2>
        <ProgressWithText value={progressPercentage} text={`${Math.round(progressPercentage)}%`} className="mt-2 mb-4" />
      </div>
      <nav>
        <ul>
          {module.lessons.map((lesson) => (
            <li key={lesson.id}>
              <button 
                onClick={() => onLessonClick(lesson.id)}
                className="flex items-center justify-between p-2 transition-colors rounded-xl border w-full text-left border-transparent hover:border-blue-600"
              >
                <span>{lesson.title}</span>
                {moduleProgress[lesson.id.toString()] && <CheckCircle className="h-4 w-4 text-green-500" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
})

MobileModuleView.displayName = 'MobileModuleView'

export default MobileModuleView
