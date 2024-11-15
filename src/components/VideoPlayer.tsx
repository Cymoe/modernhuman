import { useState, useEffect } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [videoUrl]);

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
      <div className="aspect-video bg-black relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <PlayIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-400">Video unavailable</p>
            </div>
          </div>
        ) : (
          <iframe
            key={videoUrl}
            src={videoUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={handleError}
          />
        )}
      </div>
      <div className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
      </div>
    </div>
  );
}