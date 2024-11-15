export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseContent {
  title: string;
  modules: Module[];
}

export interface UserProgress {
  courseId: string;
  completedLessons: string[];
  lastViewedLesson: string;
}