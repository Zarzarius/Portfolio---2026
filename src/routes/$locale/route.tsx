import {
  Outlet,
  createFileRoute,
  redirect,
  useRouterState,
} from '@tanstack/react-router';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/locales';

function normalizeToDefaultLocale(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const rest = parts.slice(1).join('/');
  return rest.length > 0 ? `/${DEFAULT_LOCALE}/${rest}` : `/${DEFAULT_LOCALE}`;
}

export const Route = createFileRoute('/$locale')({
  beforeLoad: ({ params, location }) => {
    const rawLocale = params.locale;
    if (!isLocale(rawLocale)) {
      throw redirect({
        href: `${normalizeToDefaultLocale(location.pathname)}${location.searchStr}${location.hash}`,
      });
    }
    return { locale: rawLocale as Locale };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const pathname = useRouterState({
    select: (state) => state.matches[state.matches.length - 1]?.pathname,
  });
  return <Outlet key={pathname} />;
}
