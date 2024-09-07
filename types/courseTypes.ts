export interface Module {
  id: number; // Change this from string to number
  title: string;
  description: string;
  color: string;
  progress: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  content: string;
  resources: Resource[];
  completed: boolean; // Add this line if it's not already present
}

interface Resource {
  title: string;
  url: string;
}
