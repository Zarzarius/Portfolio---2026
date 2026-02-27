import { createFileRoute, redirect } from '@tanstack/react-router';
import { DEFAULT_LOCALE } from '@/i18n';

export const Route = createFileRoute('/projects/$projectSlug')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/$locale/projects/$projectSlug',
      params: {
        locale: DEFAULT_LOCALE,
        projectSlug: params.projectSlug,
      },
    });
  },
});
