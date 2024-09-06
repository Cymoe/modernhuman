import React from 'react';

interface LessonContentProps {
  lesson: {
    title: string;
    content: string;
    videoUrl?: string;
  };
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
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
    </div>
  );
};

export default LessonContent;
