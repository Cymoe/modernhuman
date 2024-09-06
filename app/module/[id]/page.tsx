'use client'

import { useParams, useRouter } from "next/navigation"
import { modules } from "@/app/data/courseData"
import LessonSidebar from "@/components/LessonSidebar"
import LessonContent from "@/components/LessonContent"
import { useState, useEffect } from 'react'
import MobileModuleView from "@/components/MobileModuleView"

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(true) // Temporarily set to true
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null)
  const moduleId = parseInt(params.id as string)
  const moduleData = modules.find(m => m.id === moduleId)

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 975
      setIsMobile(mobile)
      console.log('Is mobile:', mobile) // Add this line
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, []) // Empty dependency array

  if (!moduleData) {
    return <div>Module not found</div>
  }

  const handleLessonClick = (lessonId: number) => {
    if (isMobile) {
      router.push(`/module/${moduleId}/lesson/${lessonId}`)
    } else {
      setSelectedLessonId(lessonId)
    }
  }

  const selectedLesson = moduleData.lessons.find(l => l.id === selectedLessonId)

  const { progress } = useProgress()
  const moduleProgress = progress[moduleId.toString()] || {}
  const completedLessons = Object.values(moduleProgress).filter(Boolean).length
  const totalLessons = moduleData.lessons.length
  const progressPercentage = (completedLessons / totalLessons) * 100

  const mobileModuleData = {
    ...moduleData,
    progress: progressPercentage
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      {isMobile ? (
        <MobileModuleView module={mobileModuleData} />
      ) : (
        <>
          <LessonSidebar 
            moduleId={moduleId} 
            lessons={moduleData.lessons} 
            moduleTitle={moduleData.title}
            onLessonClick={handleLessonClick}
          />
          {selectedLesson && (
            <div className="flex-grow">
              <LessonContent lesson={selectedLesson} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
