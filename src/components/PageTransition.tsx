import { useEffect } from 'react';
import { useLocation, useRouterState } from '@tanstack/react-router';
import styles from './PageTransition.module.scss';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const resolvedPathname = useRouterState({
    select: (s) => s.resolvedLocation?.pathname,
    structuralSharing: true,
  });

  const resolvedPath = resolvedPathname ?? location.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [resolvedPath]);

  return <div className={styles.pageTransition}>{children}</div>;
}
