'use client'

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useProgress } from "../../../contexts/ProgressContext"

export default function LessonPage() {
  const params = useParams()
  const { moduleId, lessonId } = params
  const { progress, updateProgress } = useProgress()

  const isCompleted = progress[moduleId as string]?.[lessonId as string] || false

  const handleComplete = () => {
    updateProgress(moduleId as string, lessonId as string, true)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Lesson {lessonId}</h1>
        <div className="prose prose-invert max-w-none">
          <p>This is the content for lesson {lessonId} of module {moduleId}.</p>
          {/* Add more lesson content here */}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <Link href={`/module/${moduleId}`}>
            <Button variant="outline">Back to Module</Button>
          </Link>
          <Button onClick={handleComplete} disabled={isCompleted}>
            {isCompleted ? "Completed" : "Mark as Complete"}
          </Button>
        </div>
      </div>
    </div>
  )
}
