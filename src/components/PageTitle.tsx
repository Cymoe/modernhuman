import { useEffect } from 'react';

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  useEffect(() => {
    document.title = `${title} | ModernHuman`;
    return () => {
      document.title = 'ModernHuman';
    };
  }, [title]);

  return null;
}