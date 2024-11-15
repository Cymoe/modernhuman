import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import CourseSidebar from '../components/CourseSidebar';
import CourseDetailSkeleton from '../components/CourseDetailSkeleton';
import PageTitle from '../components/PageTitle';
import { courseContent } from '../data/courseContent';
import { courses } from '../data/courses';
import { Lesson } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function CourseDetail() {
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const course = courseId ? courseContent[courseId] : null;
  const courseInfo = courses.find(c => c.id === courseId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (course) {
      setCurrentLesson(course.modules[0].lessons[0]);
    }
  }, [course]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  if (!course || !courseInfo || !currentLesson) {
    return <Navigate to="/courses" replace />;
  }

  const findLessonPosition = () => {
    let currentModuleIndex = -1;
    let currentLessonIndex = -1;

    course.modules.forEach((module, mIndex) => {
      const lIndex = module.lessons.findIndex(l => l.id === currentLesson?.id);
      if (lIndex !== -1) {
        currentModuleIndex = mIndex;
        currentLessonIndex = lIndex;
      }
    });

    return { currentModuleIndex, currentLessonIndex };
  };

  const navigateLesson = (direction: 'prev' | 'next') => {
    const { currentModuleIndex, currentLessonIndex } = findLessonPosition();
    const currentModule = course.modules[currentModuleIndex];

    if (direction === 'prev') {
      if (currentLessonIndex > 0) {
        // Previous lesson in same module
        setCurrentLesson(currentModule.lessons[currentLessonIndex - 1]);
      } else if (currentModuleIndex > 0) {
        // Last lesson of previous module
        const prevModule = course.modules[currentModuleIndex - 1];
        setCurrentLesson(prevModule.lessons[prevModule.lessons.length - 1]);
      }
    } else {
      if (currentLessonIndex < currentModule.lessons.length - 1) {
        // Next lesson in same module
        setCurrentLesson(currentModule.lessons[currentLessonIndex + 1]);
      } else if (currentModuleIndex < course.modules.length - 1) {
        // First lesson of next module
        setCurrentLesson(course.modules[currentModuleIndex + 1].lessons[0]);
      }
    }
  };

  const { currentModuleIndex, currentLessonIndex } = findLessonPosition();
  const isFirstLesson = currentModuleIndex === 0 && currentLessonIndex === 0;
  const isLastLesson = currentModuleIndex === course.modules.length - 1 && 
    currentLessonIndex === course.modules[currentModuleIndex].lessons.length - 1;

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-[calc(100vh-73px)] relative">
      <PageTitle title={courseInfo.title} />
      
      {/* Mobile Navigation Buttons */}
      <div className="md:hidden fixed bottom-20 left-0 right-0 z-50 flex justify-center space-x-4 px-4">
        <button
          onClick={() => navigateLesson('prev')}
          disabled={isFirstLesson}
          className={`flex items-center justify-center p-3 rounded-full shadow-lg ${
            isFirstLesson 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-blue-500 text-white'
          }`}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => navigateLesson('next')}
          disabled={isLastLesson}
          className={`flex items-center justify-center p-3 rounded-full shadow-lg ${
            isLastLesson
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-blue-500 text-white'
          }`}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        {isSidebarOpen ? 'Close' : 'Lessons'}
      </button>

      <div className="max-w-[1200px] mx-auto h-full flex flex-col md:flex-row">
        <div
          className={`${
            isSidebarOpen ? 'fixed inset-0 z-40' : 'hidden'
          } md:relative md:block md:w-[300px] md:border-r border-zinc-800`}
        >
          <div className="h-full w-full md:w-auto">
            <CourseSidebar
              modules={course.modules}
              onSelectLesson={handleLessonSelect}
              currentLessonId={currentLesson.id}
              courseTitle={courseInfo.title}
            />
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <VideoPlayer
            videoUrl={currentLesson.videoUrl}
            title={currentLesson.title}
          />
        </div>
      </div>
    </div>
  );
}