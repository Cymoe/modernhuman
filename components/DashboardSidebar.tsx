import Link from 'next/link'
import { UserButton } from "@clerk/nextjs"
import { usePathname } from 'next/navigation'

export default function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <aside className="w-64 bg-black text-white flex flex-col h-full border-r border-zinc-800">
      <div className="p-4 mb-2">
        <Link href="/dashboard" className="text-xl font-bold">
          ModernHuman
        </Link>
      </div>
      <nav className="flex-grow">
        <ul>
          <li>
            <Link 
              href="/dashboard" 
              className={`block py-2 px-4 transition duration-150 ease-in-out ${
                isActive('/dashboard') ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-900'
              }`}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link 
              href="/profile" 
              className={`block py-2 px-4 transition duration-150 ease-in-out ${
                isActive('/profile') ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-900'
              }`}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-4">
        <UserButton 
          showName={true} 
          afterSignOutUrl="/" 
          appearance={{ 
            elements: { 
              userButtonBox: "text-white flex-row-reverse" 
            } 
          }} 
        />
      </div>
    </aside>
  )
}
