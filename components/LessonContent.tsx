import React from 'react';

interface LessonContentProps {
  lesson: {
    title: string;
    content: string;
    videoUrl?: string;
  };
  isCompleted: boolean;
  onComplete: () => void;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson, isCompleted, onComplete }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      {lesson.videoUrl && (
        <div className="mb-4">
          <iframe
            width="100%"
            height="315"
            src={lesson.videoUrl}
            title={lesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="prose max-w-none">
        {lesson.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
      <button 
        onClick={onComplete}
        className={`mt-4 px-4 py-2 rounded ${
          isCompleted ? 'bg-green-500' : 'bg-blue-500'
        } text-white`}
      >
        {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>
    </div>
  );
};

export default LessonContent;
