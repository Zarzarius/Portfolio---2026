import { useEffect, useState } from 'react';
import { useLocation, useRouterState } from '@tanstack/react-router';
import clsx from 'clsx';
import styles from './PageTransition.module.scss';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const { status, resolvedPathname, isLoading } = useRouterState({
    select: (s) => ({
      status: s.status,
      resolvedPathname: s.resolvedLocation?.pathname,
      isLoading: s.isLoading,
    }),
    structuralSharing: true,
  });

  const resolvedPath = resolvedPathname ?? location.pathname;
  const isPending = status === 'pending' || isLoading;
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isPending) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 450); // Match motion-duration-entrance

    return () => clearTimeout(timer);
  }, [resolvedPath, isPending]);

  return (
    <div
      key={resolvedPath}
      className={clsx(
        styles.pageTransition,
        !isPending && (isAnimating ? styles.entering : styles.idle),
      )}
    >
      {children}
    </div>
  );
}
