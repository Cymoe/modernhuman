import React from 'react'
import { Progress } from './progress'

interface ProgressWithTextProps {
  value: number
  text: string
  className?: string
}

export const ProgressWithText: React.FC<ProgressWithTextProps> = ({ value, text, className }) => {
  return (
    <div className={`relative ${className}`}>
      <Progress value={value} className="h-4" /> {/* Changed from h-6 to h-4 */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
        <span className="text-black text-xs font-medium">{text}</span> {/* Changed from text-sm to text-xs */}
      </div>
    </div>
  )
}
