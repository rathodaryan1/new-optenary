import { useState, useEffect, useRef, Suspense } from 'react';
import type { ReactNode } from 'react';

interface LazyShowProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}

export default function LazyShow({ children, fallback = <div style={{ height: '300px' }} />, rootMargin = '400px' }: LazyShowProps) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {show ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}
