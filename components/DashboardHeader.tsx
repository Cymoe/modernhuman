import Link from 'next/link'
import { UserButton, useUser } from "@clerk/nextjs"
import { usePathname } from 'next/navigation'

export default function DashboardHeader() {
  const pathname = usePathname()
  const { user } = useUser()
  
  const isCoursesActive = pathname === '/dashboard' || pathname.includes('/module') || pathname.includes('/lesson')

  return (
    <header className="bg-black w-full border-b border-zinc-800 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1075px] mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <Link href="/dashboard" className="text-gray-200 text-xl font-bold mb-2 self-start">
              ModernHuman
            </Link>
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
        <div className="flex items-center">
          <span className="text-gray-300 mr-2 hidden lg:inline">
            {user?.firstName && user?.lastName 
              ? `${user.firstName} ${user.lastName}`
              : user?.firstName || user?.lastName || ''}
          </span>
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{ 
              elements: { 
                userButtonBox: "text-gray-300",
                userButtonOuterIdentifier: "hidden" // Always hide the name in the button
              } 
            }} 
          />
        </div>
      </div>
    </header>
  )
}
