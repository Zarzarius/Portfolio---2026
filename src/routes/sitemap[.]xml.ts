import { createFileRoute } from '@tanstack/react-router';
import { buildSitemapXml, textResponse } from '@/data/discoverability';

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () =>
        textResponse(buildSitemapXml(), 'application/xml; charset=utf-8'),
    },
  },
});
