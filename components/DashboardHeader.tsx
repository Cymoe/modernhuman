import Link from 'next/link'
import { usePathname, useParams, useRouter } from 'next/navigation'
import { UserButton, useUser } from "@clerk/nextjs"
import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import confetti from 'canvas-confetti';

interface DashboardHeaderProps {
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
  isModuleCompleted: boolean;
  allLessonsCompleted: boolean; // Add this new prop
}

export default function DashboardHeader({ 
  isLessonCompleted, 
  onToggleComplete, 
  isModuleCompleted,
  allLessonsCompleted
}: DashboardHeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);

  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const moduleId = params?.id as string;

  const isDashboardPage = pathname === '/dashboard';
  const isCoursesActive = isDashboardPage || pathname.startsWith('/module/');
  const isCommunityActive = pathname === '/community';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);

      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  const handleBackClick = () => {
    const pathSegments = pathname.split('/').filter(Boolean)
    
    if (pathSegments.length > 2 && pathSegments[0] === 'module') {
      // If we're in a lesson, go back to the module page
      router.push(`/module/${pathSegments[1]}`)
    } else if (pathSegments.length === 2 && pathSegments[0] === 'module') {
      // If we're on a module page, go back to the dashboard
      router.push('/dashboard')
    } else {
      // For any other case, go to the dashboard
      router.push('/dashboard')
    }
  };

  useEffect(() => {
    console.log('Props:', { isLessonCompleted, isModuleCompleted, allLessonsCompleted });
  }, [isLessonCompleted, isModuleCompleted, allLessonsCompleted]);

  useEffect(() => {
    if (isModuleCompleted && allLessonsCompleted && !confettiTriggered) {
      const moduleCompletionKey = `module_${moduleId}_completed`;
      const isModuleAlreadyCompleted = localStorage.getItem(moduleCompletionKey);

      if (!isModuleAlreadyCompleted) {
        console.log('Triggering confetti');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setConfettiTriggered(true);
        localStorage.setItem(moduleCompletionKey, 'true');
      }
    }
  }, [isModuleCompleted, allLessonsCompleted, confettiTriggered, moduleId]);

  return (
    <>
      {isMobile && (
        <header className="bg-black w-full border-b border-zinc-800 fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between">
          <div className="flex items-center">
            {pathname !== '/dashboard' && (
              <button onClick={handleBackClick} className="text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}
            <Link href="/dashboard" className="text-gray-200 text-xl font-bold text-left">
              ModernHuman
            </Link>
          </div>
          <div className="flex items-center">
            {isSignedIn && (
              <div className="flex items-center">
                <span className="text-[rgb(75,85,99)] text-xs mr-2">{user?.firstName}</span>
                <UserButton />
              </div>
            )}
          </div>
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
                <Link 
                  href="/dashboard" 
                  className={`hover:text-gray-300 relative ${isCoursesActive ? 'text-white nav-active' : 'text-[rgb(75,85,99)]'}`}
                >
                  Courses
                  {isCoursesActive && <div className="absolute bottom-[-18px] left-0 w-full h-[2px] bg-white"></div>}
                </Link>
                <Link 
                  href="/community" 
                  className={`hover:text-gray-300 relative ${isCommunityActive ? 'text-white nav-active' : 'text-[rgb(75,85,99)]'}`}
                >
                  Community
                  {isCommunityActive && <div className="absolute bottom-[-18px] left-0 w-full h-[2px] bg-white"></div>}
                </Link>
              </nav>
            </div>
          </div>
          {!isMobile && isSignedIn && (
            <div className="flex items-center">
              <span className="text-[rgb(75,85,99)] text-xs mr-2">{`${user?.firstName} ${user?.lastName}`}</span>
              <UserButton />
            </div>
          )}
        </div>
      </header>
    </>
  )
}
