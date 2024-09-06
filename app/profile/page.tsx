'use client'

import { Suspense } from 'react'
import { useProgress } from "@/app/contexts/ProgressContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const modules = [
  { id: 1, title: "Introduction to Programming", lessons: 5 },
  { id: 2, title: "Web Development Basics", lessons: 8 },
  { id: 3, title: "Advanced JavaScript", lessons: 6 },
]

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfileContent />
    </Suspense>
  )
}

function ProfileContent() {
  const { progress } = useProgress()

  const totalLessons = modules.reduce((sum, module) => sum + module.lessons, 0)
  const completedLessons = Object.values(progress).reduce((total, module) => 
    total + Object.values(module).filter(Boolean).length, 0
  )

  const overallProgress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        
        <Card className="bg-zinc-800 border-zinc-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-zinc-700 rounded-full h-2.5 mb-4">
              <div 
                className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-400">{completedLessons} of {totalLessons} lessons completed ({overallProgress}%)</p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Module Progress</h2>
        {modules.map((module) => {
          const moduleProgress = progress[module.id.toString()] || {}
          const completedModuleLessons = Object.values(moduleProgress).filter(Boolean).length
          const moduleProgressPercentage = Math.round((completedModuleLessons / module.lessons) * 100)

          return (
            <Card key={module.id} className="bg-zinc-800 border-zinc-700 mb-4">
              <CardHeader>
                <CardTitle className="text-white">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-zinc-700 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${moduleProgressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-gray-400">{completedModuleLessons} of {module.lessons} lessons completed ({moduleProgressPercentage}%)</p>
                <Link href={`/module/${module.id}`}>
                  <Button variant="secondary" className="mt-2">Go to Module</Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}

        {/* Quiz scores would go here, but we need to implement quiz functionality first */}
      </div>
    </div>
  )
}
