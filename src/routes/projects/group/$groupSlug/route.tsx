import { createFileRoute, redirect } from '@tanstack/react-router';
import { DEFAULT_LOCALE } from '@/i18n';

export const Route = createFileRoute('/projects/group/$groupSlug')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/$locale/projects/group/$groupSlug',
      params: {
        locale: DEFAULT_LOCALE,
        groupSlug: params.groupSlug,
      },
    });
  },
});
