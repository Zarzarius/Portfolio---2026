import { createFileRoute, redirect } from '@tanstack/react-router';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '@/i18n';

function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, qStr] = lang.trim().split(';q=');
      const q = qStr ? parseFloat(qStr) : 1.0;
      return { code: code.toLowerCase().split('-')[0], q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of languages) {
    if (SUPPORTED_LOCALES.includes(code as Locale)) {
      return code as Locale;
    }
  }

  return DEFAULT_LOCALE;
}

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    const acceptLanguage = context?.request?.headers?.get?.('accept-language') ?? null;
    const locale = getPreferredLocale(acceptLanguage);
    throw redirect({
      to: '/$locale',
      params: { locale },
    });
  },
});
