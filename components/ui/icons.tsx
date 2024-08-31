import { Check, LucideProps, Moon, SunMedium, Twitter } from "lucide-react"

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  check: Check,
  // Add any other icons you need
}

export type Icon = keyof typeof Icons
