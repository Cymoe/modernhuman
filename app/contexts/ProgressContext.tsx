'use client'

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'

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

interface ProgressContextType {
  progress: Progress
  quizScores: QuizScores
  updateProgress: (moduleId: string, lessonId: string, completed: boolean) => void
  updateQuizScore: (moduleId: string, lessonId: string, score: number) => void
  completedLessons: Record<string, string[]>
  isLoading: boolean
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress>({})
  const [quizScores, setQuizScores] = useState<QuizScores>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedProgress = localStorage.getItem('progress')
    const storedQuizScores = localStorage.getItem('quizScores')
    if (storedProgress) setProgress(JSON.parse(storedProgress))
    if (storedQuizScores) setQuizScores(JSON.parse(storedQuizScores))
    setIsLoading(false)
  }, [])

  const updateProgress = (moduleId: string, lessonId: string, completed: boolean) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        [moduleId]: {
          ...prev[moduleId],
          [lessonId]: completed
        }
      }
      localStorage.setItem('progress', JSON.stringify(newProgress))
      return newProgress
    })
  }

  const updateQuizScore = (moduleId: string, lessonId: string, score: number) => {
    setQuizScores(prev => {
      const newQuizScores = {
        ...prev,
        [moduleId]: {
          ...prev[moduleId],
          [lessonId]: score
        }
      }
      localStorage.setItem('quizScores', JSON.stringify(newQuizScores))
      return newQuizScores
    })
  }

  const completedLessons = useMemo(() => {
    return Object.entries(progress).reduce((acc, [moduleId, lessons]) => {
      acc[moduleId] = Object.keys(lessons).filter(lessonId => lessons[lessonId]);
      return acc;
    }, {} as Record<string, string[]>);
  }, [progress]);

  const contextValue = useMemo(() => ({
    progress,
    quizScores,
    completedLessons,
    updateProgress,
    updateQuizScore,
    isLoading
  }), [progress, quizScores, completedLessons, isLoading]);

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}