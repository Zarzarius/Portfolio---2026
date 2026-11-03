import { createFileRoute } from '@tanstack/react-router';
import { buildLlmsFullTxt, textResponse } from '@/data/discoverability';

export const Route = createFileRoute('/llms-full.txt')({
  server: {
    handlers: {
      GET: async () =>
        textResponse(buildLlmsFullTxt(), 'text/plain; charset=utf-8'),
    },
  },
});
