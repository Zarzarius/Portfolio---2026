import { useEffect, useState } from 'react';
import { useMessages } from '../i18n/useMessages';
import styles from './ThemeToggle.module.scss';

const STORAGE_KEY = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

function getTheme(): 'dark' | 'light' {
  if (typeof document === 'undefined') return THEME_LIGHT;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === THEME_DARK || stored === THEME_LIGHT) return stored;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return THEME_DARK;
  }
  return THEME_LIGHT;
}

function applyTheme(theme: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(THEME_LIGHT);
  const t = useMessages();

  useEffect(() => {
    const initial = getTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  // Re-sync theme when page is restored from back/forward cache (bfcache)
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        const next = getTheme();
        setTheme(next);
        applyTheme(next);
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const toggle = () => {
    const next = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={
        theme === THEME_DARK
          ? t.common.switchToLightTheme
          : t.common.switchToDarkTheme
      }
      title={theme === THEME_DARK ? t.common.lightMode : t.common.darkMode}
    >
      <span className={styles.icon} aria-hidden>
        {theme === THEME_DARK ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
