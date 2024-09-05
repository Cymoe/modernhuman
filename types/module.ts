export interface Module {
  id: string;
  title: string;
  // Add other properties as needed
}

interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  content: string;
  resources: Resource[];
}

interface Resource {
  title: string;
  url: string;
}
