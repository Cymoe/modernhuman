'use client'

import React, { useMemo, useCallback } from 'react'
import { Module } from '@/types/courseTypes'
import { ProgressWithText } from "@/components/ui/progress-with-text"
import { CheckCircle } from 'lucide-react'
import { useProgress } from "@/app/contexts/ProgressContext"
import { useRouter } from 'next/navigation'

interface Props {
  module: Module;
}

const MobileModuleView: React.FC<Props> = React.memo(({ module }) => {
  const { progress } = useProgress()
  const router = useRouter()

  const { moduleProgress, progressPercentage } = useMemo(() => {
    const moduleProgress = progress[module.id.toString()] || {}
    const completedLessons = Object.values(moduleProgress).filter(Boolean).length
    const progressPercentage = (completedLessons / module.lessons.length) * 100
    return { moduleProgress, progressPercentage }
  }, [progress, module.id, module.lessons.length])

  const handleLessonClick = useCallback((lessonId: number) => {
    router.push(`/module/${module.id}/lesson/${lessonId}`)
  }, [router, module.id])

  return (
    <div className="w-full bg-black text-[rgb(75,85,99)] rounded-xl mobileModuleView">
      <div className="p-2">
        <h2 className="text-xl font-bold text-gray-300 mb-2">{module.title}</h2>
        <ProgressWithText value={progressPercentage} text={`${Math.round(progressPercentage)}%`} className="mt-2 mb-4" />
      </div>
      <nav>
        <ul>
          {module.lessons.map((lesson) => (
            <div 
              key={lesson.id}
              onClick={() => handleLessonClick(lesson.id)}
              className="flex items-center justify-between p-2 transition-colors rounded-xl border w-full text-left border-transparent hover:border-blue-600 cursor-pointer"
            >
              <span>{lesson.title}</span>
              {moduleProgress[lesson.id.toString()] && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
          ))}
        </ul>
      </nav>
    </div>
  )
})

MobileModuleView.displayName = 'MobileModuleView'

export default MobileModuleView
