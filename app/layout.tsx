'use client'

import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from "next/font/google"
import { ProgressProvider } from './contexts/ProgressContext'
import Header from '../components/Header'
import DashboardHeader from '../components/DashboardHeader'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import ScrollToTopButton from '../components/ScrollToTopButton'
import { ScrollToTop } from '../components/ScrollToTop'

const inter = Inter({ subsets: ["latin"] })

const isLessonCompleted = false; // or some state value
const onToggleComplete = () => {
  // Function to toggle lesson completion
};

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDashboardOrRelated = pathname?.startsWith('/dashboard') || pathname?.includes('/module/');
  const isDashboardPage = pathname === '/dashboard';

  return (
    <>
      <ScrollToTop />
      <ProgressProvider>
        {/* Rest of the content */}
      </ProgressProvider>
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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