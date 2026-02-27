import { createFileRoute, redirect } from '@tanstack/react-router';
import { DEFAULT_LOCALE } from '@/i18n';

export const Route = createFileRoute('/projects')({
  beforeLoad: () => {
    throw redirect({
      to: '/$locale/projects',
      params: { locale: DEFAULT_LOCALE },
    });
  },
});
