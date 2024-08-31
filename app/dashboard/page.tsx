'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

const modules = [
  { id: 1, title: "Introduction to Programming", lessons: 5 },
  { id: 2, title: "Web Development Basics", lessons: 8 },
  { id: 3, title: "Advanced JavaScript", lessons: 6 },
]

export default function DashboardPage() {
  const { isSignedIn, user } = useUser()

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-6">
    
        {isSignedIn ? (
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
        ) : (
          <div className="text-center mt-10">
            <h2 className="text-2xl mb-4">Please sign in to view the course modules</h2>
          </div>
        )}
      </div>
    </div>
  )
}
