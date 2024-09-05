import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const ProgressWithText = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    bgColor?: string
    fillColor?: string
  }
>(({ className, value, bgColor, fillColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full",
      "bg-zinc-800",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full flex-1 transition-all",
        "bg-green-500" // Changed from bg-white to bg-green-500
      )}
      style={{ width: `${value}%` }}
    />
    <div className="absolute inset-0 flex items-center pl-2">
      <span className="text-xs font-bold text-zinc-800">{Math.round(value || 0)}%</span>
    </div>
  </ProgressPrimitive.Root>
))
ProgressWithText.displayName = ProgressPrimitive.Root.displayName

export { ProgressWithText }
