import { useEffect, useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import clsx from 'clsx';
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
    }, 450); // Match motion-duration-entrance

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      className={clsx(
        styles.pageTransition,
        isAnimating ? styles.entering : styles.idle,
      )}
    >
      {children}
    </div>
  );
}
