'use client'

import { useParams, useRouter } from "next/navigation"
import { modules } from "@/app/data/courseData"
import LessonSidebar from "@/components/LessonSidebar"
import { useState, useEffect } from 'react'
import MobileModuleView from "@/components/MobileModuleView"
import { useProgress } from "@/app/contexts/ProgressContext"

export default function ModulePage({ params }: { params: { id: string } }) {
  const { progress } = useProgress();
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const moduleId = parseInt(params.id as string)
  const moduleData = modules.find(m => m.id === moduleId)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 975)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  if (!moduleData) return <div>Module not found</div>

  const handleLessonClick = (lessonId: number) => {
    router.push(`/module/${moduleId}/lesson/${lessonId}`)
  }

  const completedLessons = progress[moduleId.toString()] || {}
  const totalLessons = moduleData.lessons.length
  const progressPercentage = (Object.values(completedLessons).filter(Boolean).length / totalLessons) * 100

  const mobileModuleData = {
    ...moduleData,
    progress: progressPercentage,
    lessons: moduleData.lessons.map(lesson => ({
      ...lesson,
      completed: completedLessons[lesson.id.toString()] || false
    })),
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      {isMobile ? (
        <MobileModuleView 
          key={moduleId}  // Add this line
          module={mobileModuleData} 
          onLessonClick={handleLessonClick}
        />
      ) : (
        <LessonSidebar 
          moduleId={moduleId} 
          lessons={moduleData.lessons} 
          moduleTitle={moduleData.title}
          onLessonClick={handleLessonClick}
          currentLessonId={null}
        />
      )}
    </div>
  )
}
