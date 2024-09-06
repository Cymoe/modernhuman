'use client'

import { modules } from "@/app/data/courseData"
import ModuleCard from "@/components/ModuleCard"
import { useUser } from "@clerk/nextjs"
import { useProgress } from "@/app/contexts/ProgressContext"

export default function DashboardPage() {
  const { isSignedIn } = useUser()
  const { progress } = useProgress()

  return (
    <div>
      {isSignedIn ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:p-6">
          {modules.map((module) => {
            const moduleProgress = progress[module.id.toString()] || {}
            const completedLessons = Object.values(moduleProgress).filter(Boolean).length
            const totalLessons = module.lessons.length
            const progressPercentage = (completedLessons / totalLessons) * 100

            return (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                color={module.color}
                progressPercentage={progressPercentage}
                lessons={module.lessons}
              />
            )
          })}
        </div>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl mb-4">Please sign in to view the course modules</h2>
        </div>
      )}
    </div>
  )
}
