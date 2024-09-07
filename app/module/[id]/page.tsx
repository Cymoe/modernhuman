'use client'

import { useParams } from "next/navigation"
import { useMemo } from 'react'
import { modules } from "@/app/data/courseData"
import MobileModuleView from "@/components/MobileModuleView"
import DashboardHeader from "@/components/DashboardHeader"
import { Module as CourseModule } from '@/types/courseTypes';

// Remove or comment out this local type definition
// type Module = {
//   id: string; // Change this from number to string
//   title: string;
//   description: string;
//   color: string;
//   lessons: any[]; // Replace 'any[]' with the correct type for lessons
//   progress: number;
// };

export interface Module {
  id: string;
  title: string;
  description: string;
  color: string;
  lessons: any[]; // Replace 'any[]' with the correct type for lessons
  progress: number;
}

function ModulePage() {
  const params = useParams()
  const moduleId = params.id as string

  const moduleData = useMemo(() => {
    const foundModule = modules.find(m => m.id.toString() === moduleId)
    return foundModule ? { ...foundModule, id: moduleId } : null
  }, [moduleId])

  if (!moduleData) return null

  const moduleDataWithProgress: Module = {
    ...moduleData,
    id: moduleData.id, // Keep id as string
    progress: 0, // or whatever default value is appropriate
    lessons: moduleData?.lessons || [], // Add this line
  };

  return (
    <div className="flex flex-col min-h-screen pt-16"> {/* Adjust pt-16 as needed */}
      <MobileModuleView module={moduleDataWithProgress} />
      <DashboardHeader 
        isLessonCompleted={false}
        onToggleComplete={() => {}}
        isModuleCompleted={false}
        allLessonsCompleted={false}
      />
    </div>
  )
}

export default ModulePage
