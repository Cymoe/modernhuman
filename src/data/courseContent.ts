import { CourseContent } from '../types';

export const courseContent: Record<string, CourseContent> = {
  'coding-with-ai': {
    title: 'Coding with AI',
    modules: [
      {
        id: 'module-1',
        title: 'Getting Started with AI Tools',
        lessons: [
          {
            id: 'lesson-1',
            title: 'Introduction to AI-Powered Development',
            duration: '5:30',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 'lesson-2',
            title: 'Setting Up Your AI Environment',
            duration: '8:45',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Advanced AI Coding Techniques',
        lessons: [
          {
            id: 'lesson-3',
            title: 'Code Generation with AI',
            duration: '10:15',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 'lesson-4',
            title: 'Debugging with AI Assistance',
            duration: '7:20',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          }
        ]
      }
    ]
  }
};