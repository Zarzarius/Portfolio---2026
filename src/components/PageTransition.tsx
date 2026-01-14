import { useEffect, useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import styles from './PageTransition.module.scss';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Match animation duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`${styles.pageTransition} ${
        isAnimating ? styles.entering : styles.idle
      }`}
    >
      {children}
    </div>
  );
}
