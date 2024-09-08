'use client'

import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { Module, Lesson } from '@/types/courseTypes'  // Add Lesson here
import { ProgressWithText } from "@/components/ui/progress-with-text"
import { CheckCircle } from 'lucide-react'
import { useProgress } from "@/app/contexts/ProgressContext"
import Link from 'next/link'

interface Props {
  module: Module;
}

interface LessonItemProps {
  lesson: Lesson;
  moduleId: number;
  isCompleted: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const LessonItem: React.FC<LessonItemProps> = React.memo(({ lesson, moduleId, isCompleted, onClick }) => (
  <Link 
    href={`/module/${moduleId}/lesson/${lesson.id}`}
    onClick={onClick}
    className="flex items-center justify-between p-2 transition-colors rounded-xl border w-full text-left border-transparent hover:border-blue-600 cursor-pointer"
  >
    <span>{lesson.title}</span>
    {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
  </Link>
))

LessonItem.displayName = 'LessonItem'

const MobileModuleView = ({ module }: { module: Module }) => {
  const { progress } = useProgress()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const { moduleProgress, progressPercentage } = useMemo(() => {
    const moduleProgress = progress[module.id.toString()] || {}
    const completedLessons = Object.values(moduleProgress).filter(Boolean).length
    const progressPercentage = (completedLessons / module.lessons.length) * 100
    return { moduleProgress, progressPercentage }
  }, [progress, module.id, module.lessons.length])

  const handleLessonClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, lessonId: number) => {
    if (isMobile) {
      e.preventDefault()
      const href = `/module/${module.id}/lesson/${lessonId}`
      requestAnimationFrame(() => {
        window.location.href = href
        requestAnimationFrame(() => {
          window.scrollTo(0, 0)
        })
      })
    }
  }, [isMobile, module.id])

  return (
    <div className="w-full bg-black text-[rgb(75,85,99)] rounded-xl mobileModuleView">
      <div className="p-2">
        <h2 className="text-xl font-bold text-gray-300 mb-2">{module.title}</h2>
        <ProgressWithText value={progressPercentage} text={`${Math.round(progressPercentage)}%`} className="mt-2 mb-4" />
      </div>
      <nav>
        <ul>
          {module.lessons.map((lesson) => (
            <LessonItem 
              key={lesson.id}
              lesson={lesson}
              moduleId={module.id}
              isCompleted={!!moduleProgress[lesson.id.toString()]}
              onClick={(e) => handleLessonClick(e, lesson.id)}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}

MobileModuleView.displayName = 'MobileModuleView'

export default React.memo(MobileModuleView)
