'use client'

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react'

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
}

const ProgressContext = createContext<ProgressContextType>({
  progress: {},
  quizScores: {},
  updateProgress: () => {},
  updateQuizScore: () => {},
  completedLessons: {}, // Initialize as an empty object
});

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress>({})
  const [quizScores, setQuizScores] = useState<QuizScores>({})
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>({});

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

  const completedLessonsMemo = useMemo(() => {
    return Object.entries(progress).reduce((acc, [moduleId, lessons]) => {
      acc[moduleId] = Object.keys(lessons).filter(lessonId => lessons[lessonId]);
      return acc;
    }, {} as Record<string, string[]>);
  }, [progress]);

  return (
    <ProgressContext.Provider value={{
      progress,
      quizScores,
      completedLessons: completedLessonsMemo,
      updateProgress,
      updateQuizScore
    }}>
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