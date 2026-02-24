import { useEffect, useState } from 'react';
import { useLocation, useRouterState } from '@tanstack/react-router';
import clsx from 'clsx';
import styles from './PageTransition.module.scss';

interface PageTransitionProps {
  children: React.ReactNode;
}

const ENTER_DURATION_MS = 550;

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const resolvedPathname = useRouterState({
    select: (s) => s.resolvedLocation?.pathname,
    structuralSharing: true,
  });

  const resolvedPath = resolvedPathname ?? location.pathname;
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    setIsEntering(true);
    const t = setTimeout(() => setIsEntering(false), ENTER_DURATION_MS);
    return () => clearTimeout(t);
  }, [resolvedPath]);

  return (
    <div
      key={resolvedPath}
      className={clsx(styles.pageTransition, isEntering && styles.entering)}
    >
      {children}
    </div>
  );
}
