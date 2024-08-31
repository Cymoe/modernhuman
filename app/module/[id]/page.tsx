'use client'

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const lessons = [
  { id: 1, title: "Variables and Data Types" },
  { id: 2, title: "Control Structures" },
  { id: 3, title: "Functions and Scope" },
]

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.id

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Module {moduleId}</h1>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/lesson/${moduleId}/${lesson.id}`}>
                  <Button variant="secondary">Start Lesson</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
