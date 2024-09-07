import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressWithText } from "@/components/ui/progress-with-text"

interface ModuleCardProps {
  id: number
  title: string
  description: string
  color: string  // Keep this prop for future use
  progressPercentage: number
  lessons: any[] // Assuming lessons is an array of objects with id property
}

const ModuleCard = React.memo(function ModuleCard({ id, title, description, color, progressPercentage, lessons }: ModuleCardProps) {
  const router = useRouter()
  const isMobileRef = useRef(false)

  useEffect(() => {
    const checkIfMobile = () => {
      isMobileRef.current = window.innerWidth < 975
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const href = isMobileRef.current ? `/module/${id}` : `/module/${id}/lesson/${lessons[0].id}`
    router.prefetch(href)
    requestAnimationFrame(() => {
      router.push(href)
    })
  }, [id, lessons, router])

  return (
    <div onClick={handleClick} className="cursor-pointer block h-full">
      <Card className="bg-transparent border-zinc-700 sm:hover:scale-105 transition-transform h-full flex flex-col overflow-hidden rounded-none sm:rounded-xl">
        <div className="w-full h-48 bg-transparent border-b border-zinc-700" />
        <CardHeader className="p-6">
          <CardTitle className="text-[#e0e0e0] line-clamp-2 leading-tight min-h-[3rem] flex items-center">
            {title}
          </CardTitle>
          <p className="text-sm text-zinc-400 mt-2 line-clamp-3">{description}</p>
        </CardHeader>
        <CardContent className="mt-auto p-6">
          <ProgressWithText value={progressPercentage} text={`${Math.round(progressPercentage)}%`} className="mt-4" />
        </CardContent>
      </Card>
    </div>
  )
})

export default ModuleCard
