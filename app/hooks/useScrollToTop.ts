import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, [pathname, searchParams]);
}
