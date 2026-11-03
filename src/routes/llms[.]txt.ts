import { createFileRoute } from '@tanstack/react-router';
import { buildLlmsTxt, textResponse } from '@/data/discoverability';

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => textResponse(buildLlmsTxt(), 'text/plain; charset=utf-8'),
    },
  },
});
