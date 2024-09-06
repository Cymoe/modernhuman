'use client'

import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from "next/font/google"
import { ProgressProvider } from './contexts/ProgressContext'
import Header from '../components/Header'
import DashboardHeader from '../components/DashboardHeader'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ["latin"] })

const isLessonCompleted = false; // or some state value
const onToggleComplete = () => {
  // Function to toggle lesson completion
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboardPage = pathname === '/dashboard'
  const isDashboardOrRelated = pathname?.startsWith('/dashboard') || 
                               pathname?.startsWith('/module') || 
                               pathname?.startsWith('/lesson') || 
                               pathname?.startsWith('/profile')

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <html lang="en">
        <body className={inter.className}>
          <ProgressProvider>
            {isDashboardOrRelated ? (
              <div className="flex flex-col bg-black min-h-screen text-white">
                <DashboardHeader isLessonCompleted={isLessonCompleted} onToggleComplete={onToggleComplete} />
                <main className="flex-grow mt-16">
                  <div className={`max-w-[1075px] mx-auto ${isDashboardPage ? 'p-0 sm:p-6' : 'p-6'}`}>
                    {children}
                  </div>
                </main>
              </div>
            ) : (
              <>
                <Header />
                <main>{children}</main>
              </>
            )}
          </ProgressProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}