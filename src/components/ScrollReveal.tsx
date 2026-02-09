import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  visibleClass?: string;
  rootMargin?: string;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  visibleClass = 'is-visible',
  rootMargin = '0px 0px -8% 0px',
  threshold = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );

    observer.observe(el);

    // Fallback: if block is already in view on load, show after layout/paint
    const t = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.95;
      if (inView) setIsVisible(true);
    }, 150);

    return () => {
      observer.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(className, isVisible && visibleClass)}
    >
      {children}
    </div>
  );
}
