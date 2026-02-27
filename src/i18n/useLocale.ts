import { useRouterState } from '@tanstack/react-router';
import { normalizeLocale, isLocale, type Locale } from './locales';

function getLocaleFromPath(pathname: string): Locale {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return normalizeLocale(firstSegment);
}

export function useCurrentLocale(): Locale {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return getLocaleFromPath(pathname);
}

export function usePathWithoutLocale(): string {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  const [first, ...rest] = segments;
  if (isLocale(first)) {
    return rest.length > 0 ? `/${rest.join('/')}` : '/';
  }
  return pathname;
}

