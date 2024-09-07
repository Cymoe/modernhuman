'use client'

import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from "next/font/google"
import { ProgressProvider } from './contexts/ProgressContext'
import Header from '../components/Header'
import DashboardHeader from '../components/DashboardHeader'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { useScrollToTop } from '@/app/hooks/useScrollToTop'

const inter = Inter({ subsets: ["latin"] })

const isLessonCompleted = false; // or some state value
const onToggleComplete = () => {
  // Function to toggle lesson completion
};

function ScrollToTopWrapper({ children }: { children: React.ReactNode }) {
  useScrollToTop();
  return <>{children}</>;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDashboardOrRelated = pathname?.startsWith('/dashboard') || pathname?.includes('/module/');
  const isDashboardPage = pathname === '/dashboard';

  return (
    <ProgressProvider>
      {isDashboardOrRelated ? (
        <div className="flex flex-col bg-black min-h-screen text-white">
          <DashboardHeader 
            isLessonCompleted={isLessonCompleted} 
            onToggleComplete={onToggleComplete}
            isModuleCompleted={false}
            allLessonsCompleted={false}
          />
          <main className="flex-grow mt-16">
            <div className={`max-w-[1075px] mx-auto ${isDashboardPage ? 'p-0 sm:p-2' : 'p-2'}`}>
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
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardPage = pathname === '/dashboard';

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <html lang="en" style={{ scrollBehavior: 'auto' }}>
        <body className={inter.className}>
          <Suspense fallback={<div>Loading...</div>}>
            <LayoutContent key={pathname}>{children}</LayoutContent>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  )
}