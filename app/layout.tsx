import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import { Inter } from "next/font/google";
import { ProgressProvider } from './contexts/ProgressContext';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

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
      <html lang="en">
        <body className={inter.className}>
          <ProgressProvider>
            <header className="bg-zinc-800 p-4">
              <div className="container mx-auto flex justify-between items-center relative">
                <SignedIn>
                  <Link href="/dashboard" className="text-white text-xl font-bold">
                    Dashboard
                  </Link>
                </SignedIn>
                <SignedOut>
                  <Link href="/" className="text-white text-xl font-bold">
                    ModernHuman
                  </Link>
                </SignedOut>
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
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </ProgressProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}