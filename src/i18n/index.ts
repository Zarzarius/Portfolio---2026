import { deMessages } from './messages/de';
import { enMessages } from './messages/en';
import { esMessages } from './messages/es';
import {
  DEFAULT_LOCALE,
  normalizeLocale,
  type Locale,
  SUPPORTED_LOCALES,
} from './locales';
import type { Messages } from './types';

const MESSAGES: Record<Locale, Messages> = {
  en: enMessages,
  es: esMessages,
  de: deMessages,
};

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale];
}

export function getLanguageName(locale: Locale): string {
  switch (locale) {
    case 'en':
      return 'English';
    case 'es':
      return 'Espanol';
    case 'de':
      return 'Deutsch';
    default:
      return 'English';
  }
}

export function toLocalizedPath(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (normalized === '/') {
    return `/${locale}`;
  }
  const withoutTrailingSlash =
    normalized.length > 1 && normalized.endsWith('/')
      ? normalized.slice(0, -1)
      : normalized;
  return `/${locale}${withoutTrailingSlash}`;
}

export function getAlternateLocalePaths(pathname: string): Array<{
  locale: Locale;
  path: string;
}> {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
    path: toLocalizedPath(pathname, locale),
  }));
}

export function localizeValue<T>(
  localized: Partial<Record<Locale, T>> | undefined,
  fallback: T,
  locale: Locale,
): T {
  if (!localized) return fallback;
  return localized[locale] ?? localized[DEFAULT_LOCALE] ?? fallback;
}

export { DEFAULT_LOCALE, SUPPORTED_LOCALES };
export { normalizeLocale };
export type { Locale };

