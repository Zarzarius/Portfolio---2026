import { createFileRoute } from '@tanstack/react-router';
import { buildRobotsTxt, textResponse } from '@/data/discoverability';

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => textResponse(buildRobotsTxt(), 'text/plain; charset=utf-8'),
    },
  },
});
