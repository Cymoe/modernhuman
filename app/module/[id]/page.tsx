'use client'

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useProgress } from "../../contexts/ProgressContext"

const lessons = [
  { id: 1, title: "Variables and Data Types" },
  { id: 2, title: "Control Structures" },
  { id: 3, title: "Functions and Scope" },
]

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.id
  const { progress } = useProgress()

  const moduleProgress = progress[moduleId as string] || {}

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Module {moduleId}</h1>
        <div className="space-y-4">
          {lessons.map((lesson) => {
            const isCompleted = moduleProgress[lesson.id] || false
            return (
              <Card key={lesson.id} className="bg-zinc-800 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white flex justify-between items-center">
                    {lesson.title}
                    {isCompleted && <span className="text-green-500">✓</span>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/lesson/${moduleId}/${lesson.id}`}>
                    <Button variant="secondary">
                      {isCompleted ? "Review Lesson" : "Start Lesson"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
