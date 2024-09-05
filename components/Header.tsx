import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function Header() {
  return (
    <header className="bg-zinc-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          ModernHuman
        </Link>
        <nav className="flex items-center">
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-white">Login</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="ghost" className="text-white">Join Now</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}
