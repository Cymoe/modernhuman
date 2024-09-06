import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Delay the scroll to top slightly to ensure it happens after route change
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  }, [pathname, searchParams]);
}
