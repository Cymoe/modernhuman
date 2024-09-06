import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressWithText } from "@/components/ui/progress-with-text"
import { useState, useEffect } from 'react'

interface ModuleCardProps {
  id: number
  title: string
  description: string
  color: string  // Keep this prop for future use
  progressPercentage: number
  lessons: any[] // Assuming lessons is an array of objects with id property
}

export default function ModuleCard({ id, title, description, color, progressPercentage, lessons }: ModuleCardProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 975)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const linkHref = isMobile ? `/module/${id}` : `/module/${id}/lesson/${lessons[0].id}`

  return (
    <Link href={linkHref} className="block h-full">
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
    </Link>
  )
}
