'use client'

import React, { useMemo, useRef, useEffect } from 'react'
import { Module } from '@/types/courseTypes'
import { ProgressWithText } from "@/components/ui/progress-with-text"
import { CheckCircle } from 'lucide-react'
import { useProgress } from "@/app/contexts/ProgressContext"
import Link from 'next/link'

interface Props {
  module: Module;
}

const MobileModuleView: React.FC<Props> = React.memo(({ module }) => {
  const { progress } = useProgress()
  const lessonsRef = useRef<HTMLUListElement>(null)
  const [isMobile, setIsMobile] = React.useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
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

  const handleLessonClick = (e: React.MouseEvent<HTMLAnchorElement>, lessonId: number) => {
    if (isMobile) {
      e.preventDefault()
      const href = `/module/${module.id}/lesson/${lessonId}`
      window.location.href = href
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }
  }

  return (
    <div className="w-full bg-black text-[rgb(75,85,99)] rounded-xl">
      <div className="p-2">
        <h2 className="text-xl font-bold text-gray-300 mb-2">{module.title}</h2>
        <ProgressWithText value={progressPercentage} text={`${Math.round(progressPercentage)}%`} className="mt-2 mb-4" />
      </div>
      <nav>
        <ul ref={lessonsRef}>
          {module.lessons.map((lesson) => (
            <Link 
              key={lesson.id}
              href={`/module/${module.id}/lesson/${lesson.id}`}
              onClick={(e) => handleLessonClick(e, lesson.id)}
              className="block"
            >
              <li className="flex items-center justify-between p-2 transition-colors rounded-xl border w-full text-left border-transparent hover:border-blue-600 cursor-pointer">
                <span>{lesson.title}</span>
                {moduleProgress[lesson.id.toString()] && <CheckCircle className="h-4 w-4 text-green-500" />}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  )
})

MobileModuleView.displayName = 'MobileModuleView'

export default MobileModuleView
