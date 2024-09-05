'use client'

import { useParams, useRouter } from "next/navigation"
import LessonSidebar from "@/components/LessonSidebar"
import { modules } from "@/app/data/courseData"
import { useEffect, useState } from "react"
import { Module } from '@/types/module'; // Add this import at the top of the file

// Add this type guard function
function isModule(obj: any): obj is Module {
  return 'title' in obj && 'lessons' in obj;
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null) // Add this state

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 975
      setIsMobile(isMobileView)
      if (!isMobileView) {
        // Redirect to first lesson if on desktop
        if ('lessons' in module && isModule(module) && Array.isArray(module.lessons) && module.lessons.length > 0) {
          router.push(`/module/${params.id}/lesson/${module.lessons[0]?.id ?? ''}`)
        }
      }
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [params.id, router])

  const moduleId = parseInt(params.id as string)
  const moduleData = modules.find(m => m.id === moduleId)

  if (!moduleData) {
    return <div>Module not found</div>
  }

  const handleLessonClick = (lessonId: number) => {
    setCurrentLessonId(lessonId);
    router.push(`/module/${moduleId}/lesson/${lessonId}`)
  }

  if (!isMobile) {
    return null // This will prevent flash of content on desktop before redirect
  }

  return (
    <div className="flex justify-center">
      <div className="flex max-w-[1400px] w-full relative">
        <LessonSidebar 
          moduleId={moduleId} 
          lessons={moduleData.lessons} 
          moduleTitle={moduleData.title}
          onLessonClick={handleLessonClick}
          currentLessonId={currentLessonId} // Add this line
        />
      </div>
    </div>
  )
}
