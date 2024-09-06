'use client'

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/app/contexts/ProgressContext"
import { modules } from "@/app/data/courseData"
import LessonSidebar from "@/components/LessonSidebar"
import { CheckCircle, ArrowLeft, ArrowRight, Menu } from 'lucide-react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { useState, useEffect } from 'react'
import DashboardHeader from "@/components/DashboardHeader"
import { calculateProgress } from '@/app/utils/progressCalculator';
import { useScrollToTop } from '@/app/hooks/useScrollToTop'
import Link from 'next/link'

export default function LessonPage() {
  useScrollToTop()
  const params = useParams()
  const router = useRouter()
  const moduleId = parseInt(params.id as string)
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(
    params.lessonId ? parseInt(params.lessonId as string) : null
  )
  const { progress, updateProgress } = useProgress()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showLessonContent, setShowLessonContent] = useState(!!currentLessonId)

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 975
      setIsMobile(isMobileView)
      setShowLessonContent(!isMobileView || !!currentLessonId)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [currentLessonId])

  let moduleData = modules.find(m => m.id === moduleId)
  if (!moduleData) return <div>Module not found</div>

  const lesson = currentLessonId ? moduleData.lessons.find(l => l.id === currentLessonId) : null

  const isCompleted = currentLessonId
    ? progress[moduleId.toString()]?.[currentLessonId.toString()] || false
    : false

  const handleComplete = () => {
    if (currentLessonId) {
      updateProgress(moduleId.toString(), currentLessonId.toString(), !isCompleted)
    }
  }

  const handleLessonClick = (lessonId: number) => {
    setCurrentLessonId(lessonId)
    setShowLessonContent(true)
    router.push(`/module/${moduleId}/lesson/${lessonId}`)
  }

  const currentModule = modules.find(m => m.id === moduleId)
  const currentLesson = currentModule?.lessons.find(l => l.id === currentLessonId)
  const nextLesson = currentModule?.lessons.find(l => l.id === (currentLessonId || 0) + 1)

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/module/${moduleId}/lesson/${nextLesson.id}`)
    }
  }

  const handleMenuClick = () => {
    router.push(`/module/${moduleId}`);
  }

  const renderLessonContent = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-300 text-base md:text-2xl font-bold">{lesson?.title}</h1>
        <button
          onClick={handleComplete}
          className={`rounded-full ${isCompleted ? 'text-green-500' : 'text-gray-400'} hover:text-green-500`}
        >
          <CheckCircle className="h-6 w-6" />
        </button>
      </div>
      <div className="relative w-full aspect-video mb-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl mx-auto">
        {!isPlaying ? (
          <>
            <Image
              src={`https://img.youtube.com/vi/${getYouTubeId(lesson?.videoUrl ?? '')}/maxresdefault.jpg`}
              alt={lesson?.title ?? ''}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <button 
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-30 transition-opacity duration-300"
            >
              <Play size={64} className="text-white" />
            </button>
          </>
        ) : (
          <iframe
            src={`${lesson?.videoUrl}?autoplay=1`}
            title={lesson?.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        )}
      </div>
      <div className="flex justify-between items-center mb-4">
        <Link 
          href={`/module/${moduleId}`}
          className="flex items-center text-gray-400 hover:text-white transition-colors md:hidden"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Menu
        </Link>
        {nextLesson && (
          <Link 
            href={`/module/${moduleId}/lesson/${nextLesson.id}`}
            className="flex items-center text-gray-400 hover:text-white transition-colors ml-auto"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="prose max-w-none mb-6">
        {lesson?.content.split('. ').map((sentence, index) => (
          <p key={index} className="mb-4 text-lg text-gray-600">
            {sentence.trim() + (index < lesson.content.split('. ').length - 1 ? '.' : '')}
          </p>
        ))}
      </div>
    </>
  )

  const totalLessons = moduleData.lessons.length

  return (
    <>
      <div className={`flex flex-col ${isMobile ? 'mt-[3.25rem]' : 'mt-16'}`}>
        {!isMobile && (
          <LessonSidebar 
            moduleId={moduleId} 
            lessons={moduleData.lessons} 
            moduleTitle={moduleData.title}
            onLessonClick={handleLessonClick}
            currentLessonId={currentLessonId}
            progressPercentage={currentLessonId !== null 
              ? calculateProgress(currentLessonId, totalLessons)
              : 0}
          />
        )}
        <div className={`flex-1 p-2 md:p-6 ${!isMobile ? 'lg:ml-96' : ''}`}>
          {lesson ? renderLessonContent() : (
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-6">{moduleData.title}</h1>
              <h2 className="text-2xl mb-4">Select a lesson to begin</h2>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

