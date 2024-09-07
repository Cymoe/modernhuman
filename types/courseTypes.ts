export interface Module {
  id: string; // Change this from number to string
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
  completed: boolean;
}

interface Resource {
  title: string;
  url: string;
}
