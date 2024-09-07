'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useRouter } from "next/navigation"
import { useProgress } from "@/app/contexts/ProgressContext"
import { modules } from "@/app/data/courseData"
import dynamic from 'next/dynamic'
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import Link from 'next/link'
import { Lesson, Module } from '@/types/courseTypes'

const LessonSidebar = dynamic(() => import("@/components/LessonSidebar"), { ssr: false })
const DashboardHeader = dynamic(() => import("@/components/DashboardHeader"), { ssr: false })

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = parseInt(params.id as string)
  const lessonId = params.lessonId ? parseInt(params.lessonId as string) : null
  const { progress, updateProgress } = useProgress()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const currentModule = useMemo(() => modules.find((module) => module.id === moduleId), [moduleId])
  const currentLesson = useMemo(() => currentModule?.lessons.find(l => l.id === lessonId), [currentModule, lessonId])

  const { completedLessons, progressPercentage, isCompleted, isAllLessonsCompleted, isModuleCompleted } = useMemo(() => {
    const completedLessons = progress[moduleId.toString()] || {}
    const progressPercentage = (Object.values(completedLessons).filter(Boolean).length / (currentModule?.lessons.length || 1)) * 100
    const isCompleted = lessonId ? completedLessons[lessonId.toString()] || false : false
    const isAllLessonsCompleted = currentModule?.lessons.every(lesson => completedLessons[lesson.id.toString()]) || false
    const isModuleCompleted = isAllLessonsCompleted
    return { completedLessons, progressPercentage, isCompleted, isAllLessonsCompleted, isModuleCompleted }
  }, [progress, moduleId, currentModule, lessonId])

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 975)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [lessonId])

  const handleComplete = useCallback(() => {
    const newCompletionStatus = !isCompleted
    updateProgress(moduleId.toString(), lessonId?.toString() ?? '', newCompletionStatus)
  }, [isCompleted, updateProgress, moduleId, lessonId])

  const handleLessonClick = useCallback((newLessonId: number) => {
    router.push(`/module/${moduleId}/lesson/${newLessonId}`)
  }, [router, moduleId])

  const renderLessonContent = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-300 text-base md:text-2xl font-bold">{currentLesson?.title}</h1>
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
              src={`https://img.youtube.com/vi/${getYouTubeId(currentLesson?.videoUrl ?? '')}/maxresdefault.jpg`}
              alt={currentLesson?.title ?? ''}
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
            src={`${currentLesson?.videoUrl}?autoplay=1`}
            title={currentLesson?.title}
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
        {currentLesson?.content.split('. ').map((sentence, index) => (
          <p key={index} className="mb-4 text-lg text-gray-600">
            {sentence.trim() + (index < currentLesson.content.split('. ').length - 1 ? '.' : '')}
          </p>
        ))}
      </div>
    </>
  )

  const nextLesson = currentModule?.lessons.find(l => l.id === (lessonId || 0) + 1)

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/module/${moduleId}/lesson/${nextLesson.id}`)
    }
  }

  const handleMenuClick = () => {
    router.push(`/module/${moduleId}`);
  }

  if (!currentLesson || !currentModule) return null

  return (
    <div className={`flex flex-col ${isMobile ? 'mt-[3.25rem]' : 'mt-16'}`}>
      {!isMobile && (
        <LessonSidebar 
          moduleId={moduleId} 
          lessons={currentModule.lessons} 
          moduleTitle={currentModule.title}
          onLessonClick={handleLessonClick}
          currentLessonId={lessonId}
          progressPercentage={progressPercentage}
        />
      )}
      <div className={`flex-1 p-2 md:p-6 ${!isMobile ? 'lg:ml-96' : ''}`}>
        {renderLessonContent()}
      </div>
      <DashboardHeader 
        isLessonCompleted={isCompleted}
        onToggleComplete={handleComplete}
        isModuleCompleted={isModuleCompleted}
        allLessonsCompleted={isAllLessonsCompleted}
      />
    </div>
  )
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

