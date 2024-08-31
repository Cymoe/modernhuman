'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Progress = {
  [moduleId: string]: {
    [lessonId: string]: boolean
  }
}

type QuizScores = {
  [moduleId: string]: {
    [lessonId: string]: number
  }
}

type ProgressContextType = {
  progress: Progress
  quizScores: QuizScores
  updateProgress: (moduleId: string, lessonId: string, completed: boolean) => void
  updateQuizScore: (moduleId: string, lessonId: string, score: number) => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>({})
  const [quizScores, setQuizScores] = useState<QuizScores>({})

  const updateProgress = (moduleId: string, lessonId: string, completed: boolean) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [lessonId]: completed
      }
    }))
  }

  const updateQuizScore = (moduleId: string, lessonId: string, score: number) => {
    setQuizScores(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [lessonId]: score
      }
    }))
  }

  return (
    <ProgressContext.Provider value={{ progress, quizScores, updateProgress, updateQuizScore }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}