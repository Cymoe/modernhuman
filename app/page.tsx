import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">ModernHumad</div>
        <nav>
          <Button variant="ghost">Product</Button>
          <Button variant="ghost">Support</Button>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          A Second Brain For <span className="text-gray-400">Modern Humans</span>
        </h1>
        <p className="text-xl mb-8">
          Capture, connect, and organize your ideas in one place.
        </p>
        <Button size="lg">Get Early Access</Button>

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
