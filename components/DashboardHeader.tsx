import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUser, UserButton } from "@clerk/nextjs"
import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

interface DashboardHeaderProps {
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
}

export default function DashboardHeader({ isLessonCompleted, onToggleComplete }: DashboardHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isSignedIn } = useUser()
  const [isMobile, setIsMobile] = useState(false)
  
  const isCoursesActive = pathname === '/dashboard' || pathname.includes('/module') || pathname.includes('/lesson')
  const isDashboardPage = pathname === '/dashboard'
  const isLessonPage = pathname.includes('/lesson')

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 975)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  return (
    <>
      {isMobile && (
        <header className="bg-black w-full border-b border-zinc-800 fixed top-0 left-0 right-0 z-50 p-4 flex items-center">
          {isDashboardPage ? (
            <svg className="h-6 w-6 text-white mr-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <button onClick={() => router.back()} className="text-white mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          )}
          <Link href="/dashboard" className="text-gray-200 text-xl font-bold flex-grow text-left">
            ModernHuman
          </Link>
          {isLessonPage && (
            <button 
              onClick={onToggleComplete}
              className={`ml-4 ${isLessonCompleted ? 'text-green-500' : 'text-gray-400'}`}
            >
              <CheckCircle className="h-6 w-6" />
            </button>
          )}
        </header>
      )}

      <header className={`bg-black w-full border-b border-zinc-800 fixed ${isMobile ? 'top-14' : 'top-0'} left-0 right-0 z-40`}>
        <div className="max-w-[1075px] mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              {!isMobile && (
                <Link href="/dashboard" className="text-gray-200 text-xl font-bold mb-2 self-start">
                  ModernHuman
                </Link>
              )}
              <nav className="flex items-center space-x-4">
                <Link href="/dashboard" className={`hover:text-gray-300 relative ${isCoursesActive ? 'text-white nav-active' : 'text-[rgb(75,85,99)]'}`}>
                  Courses
                </Link>
                <Link href="/profile" className={`hover:text-gray-300 relative ${pathname === '/profile' ? 'text-white nav-active' : 'text-[rgb(75,85,99)]'}`}>
                  Profile
                </Link>
                <Link href="/community" className={`hover:text-gray-300 relative ${pathname === '/community' ? 'text-white nav-active' : 'text-[rgb(75,85,99)]'}`}>
                  Community
                </Link>
              </nav>
            </div>
          </div>
          {!isMobile && (
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{ 
                elements: { 
                  userButtonBox: "text-white" 
                } 
              }} 
            />
          )}
        </div>
      </header>
      
      {isMobile && (
        <footer className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 p-4 flex justify-between items-center z-50">
          {isSignedIn && (
            <Link href="/dashboard">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          )}
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{ 
              elements: { 
                userButtonBox: "text-white" 
              } 
            }} 
          />
        </footer>
      )}
    </>
  )
}
