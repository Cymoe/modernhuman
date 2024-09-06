'use client'

import { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}

function HomeContent() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
        Learn AI <span className="text-gray-400">Business skills</span>
        </h1>
        <p className="text-xl mb-8 text-gray-400">
        Accelerate Your Success as a Top AI User.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button size="lg">View Courses</Button>
          </Link>
          {isSignedIn ? (
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-white border-white">Go to Dashboard</Button>
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <Button size="lg" variant="outline" className="text-black border-white">Get Started</Button>
            </SignUpButton>
          )}
        </div>

        <div className="mt-16 bg-zinc-900 rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl mb-4">How to become a modern human:</h2>
          <p className="text-gray-400 mb-4">
            A modern human is adaptable, tech-savvy, and always learning. 
            Leverage the internet to turn your ideas into impact.
          </p>
          <div className="flex items-center gap-2 mb-4">
            <span>Operate the command palette with</span>
            <kbd className="px-2 py-1 bg-zinc-800 rounded">⌘</kbd>
            <kbd className="px-2 py-1 bg-zinc-800 rounded">K</kbd>
          </div>
          <Input placeholder="Select or type a command..." />
        </div>
      </main>
    </div>
  )
}
