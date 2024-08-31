'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const modules = [
  { id: 1, title: "Introduction to Programming", lessons: 5 },
  { id: 2, title: "Web Development Basics", lessons: 8 },
  { id: 3, title: "Advanced JavaScript", lessons: 6 },
]

export default function DashboardPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Course Dashboard</h1>
          <Link href="/profile">
            <Button variant="outline" className="text-black">View Profile</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card key={module.id} className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-zinc-300">{module.lessons} lessons</p>
                <Link href={`/module/${module.id}`}>
                  <Button variant="secondary">Start Module</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
