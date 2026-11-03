import { getSiteOrigin } from './seo';
import { getProfile } from './profile';
import { projectGroups, projects } from './projects';
import { techCategories } from './stack';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  toLocalizedPath,
  type Locale,
} from '@/i18n';

function oneLine(text: string, max = 180): string {
  const sentence = text.split(/(?<=\.)\s/)[0] ?? text;
  return sentence.length <= max ? sentence : `${sentence.slice(0, max - 1).trim()}…`;
}

type SitemapEntry = {
  pathname: string;
  changefreq: 'weekly' | 'monthly';
  priority: string;
};

function sitemapPaths(): SitemapEntry[] {
  const staticPages: SitemapEntry[] = [
    { pathname: '/', changefreq: 'weekly', priority: '1.0' },
    { pathname: '/projects', changefreq: 'weekly', priority: '0.8' },
    { pathname: '/about', changefreq: 'monthly', priority: '0.7' },
    { pathname: '/contact', changefreq: 'monthly', priority: '0.6' },
  ];
  const workPages: SitemapEntry[] = [
    ...projects.map((project) => ({
      pathname: `/projects/${project.slug}`,
      changefreq: 'monthly' as const,
      priority: '0.6',
    })),
    ...projectGroups.map((group) => ({
      pathname: `/projects/group/${group.slug}`,
      changefreq: 'monthly' as const,
      priority: '0.5',
    })),
  ];
  return [...staticPages, ...workPages];
}

function localizedUrl(origin: string, pathname: string, locale: Locale): string {
  return `${origin}${toLocalizedPath(pathname, locale)}`;
}

export function buildSitemapXml(): string {
  const origin = getSiteOrigin();
  const urls = sitemapPaths()
    .flatMap((entry) =>
      SUPPORTED_LOCALES.map((locale) => {
        const loc = localizedUrl(origin, entry.pathname, locale);
        const alternates = SUPPORTED_LOCALES.map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt}" href="${localizedUrl(origin, entry.pathname, alt)}"/>`,
        ).join('\n');
        const xDefault = localizedUrl(origin, entry.pathname, DEFAULT_LOCALE);
        return `  <url>
    <loc>${loc}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>
  </url>`;
      }),
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  const missing = [
    ...projects.map((project) => project.slug),
    ...projectGroups.map((group) => `group/${group.slug}`),
  ].filter((slug) => !xml.includes(`/en/projects/${slug}</loc>`));
  if (missing.length > 0) {
    throw new Error(`Sitemap missing: ${missing.join(', ')}`);
  }

  return xml;
}

export function buildRobotsTxt(): string {
  const origin = getSiteOrigin();
  const agents = [
    '*',
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'ClaudeBot',
    'Claude-SearchBot',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    'Amazonbot',
  ];
  const rules = agents
    .map((agent) => `User-agent: ${agent}\nAllow: /`)
    .join('\n\n');
  return `${rules}

# ${origin}/llms.txt
# ${origin}/llms-full.txt

Sitemap: ${origin}/sitemap.xml
`;
}

export function buildLlmsTxt(): string {
  const origin = getSiteOrigin();
  const profile = getProfile(DEFAULT_LOCALE);
  const pages = [
    ['Home', `/${DEFAULT_LOCALE}`, 'Portfolio home, selected work, and tech stack.'],
    ['About', `/${DEFAULT_LOCALE}/about`, profile.summary],
    [
      'Projects',
      `/${DEFAULT_LOCALE}/projects`,
      'Index of professional and personal web projects.',
    ],
    [
      'Contact',
      `/${DEFAULT_LOCALE}/contact`,
      `Email ${profile.email}. Based in ${profile.location}.`,
    ],
  ] as const;

  const projectLines = [
    ...projects.map(
      (project) =>
        `- [${project.title}](${origin}/${DEFAULT_LOCALE}/projects/${project.slug}): ${oneLine(project.description)}`,
    ),
    ...projectGroups.map(
      (group) =>
        `- [${group.title}](${origin}/${DEFAULT_LOCALE}/projects/group/${group.slug}): ${oneLine(group.description ?? group.title)}`,
    ),
  ].join('\n');

  return `# ${profile.fullName}

> ${profile.tagline} in ${profile.location}. React, Next.js, WebAR, and interactive 3D.

${profile.summary}

Full project write-ups: ${origin}/llms-full.txt

## Pages

${pages
  .map(([label, path, blurb]) => `- [${label}](${origin}${path}): ${oneLine(blurb)}`)
  .join('\n')}

## Projects

${projectLines}

## Español

Same pages and project slugs under ${origin}/es.

## Identity

- GitHub: ${profile.social.github}
- LinkedIn: ${profile.social.linkedin.startsWith('http') ? profile.social.linkedin : `https://${profile.social.linkedin}`}
- Resume: ${profile.resumeUrl}
`;
}

export function buildLlmsFullTxt(): string {
  const origin = getSiteOrigin();
  const profile = getProfile(DEFAULT_LOCALE);
  const stack = techCategories
    .map((category) => {
      const names = category.technologies.map((tech) => tech.name).join(', ');
      return `- ${category.category}: ${names}`;
    })
    .join('\n');

  const projectBlocks = projects
    .map((project) => {
      const url = `${origin}/${DEFAULT_LOCALE}/projects/${project.slug}`;
      const achievements = (project.achievements ?? [])
        .map((item) => `- ${item}`)
        .join('\n');
      return `## ${project.title}

${project.description}

- URL: ${url}
- Spanish: ${origin}/es/projects/${project.slug}
- Type: ${project.type}
- Category: ${project.category}
- Technologies: ${project.technologies.join(', ')}
${project.award ? `- Award: ${project.award}\n` : ''}${project.link ? `- Live: ${project.link}\n` : ''}
${achievements}`.trim();
    })
    .join('\n\n');

  const groupBlocks = projectGroups
    .map((group) => {
      const url = `${origin}/${DEFAULT_LOCALE}/projects/group/${group.slug}`;
      const items = group.items
        .map((item) => {
          const link = item.link ? ` (${item.link})` : '';
          return `- ${item.title}${link}${item.description ? `: ${item.description}` : ''}`;
        })
        .join('\n');
      return `## ${group.title}

${group.description ?? ''}

- URL: ${url}
- Spanish: ${origin}/es/projects/group/${group.slug}
- Technologies: ${group.technologies.join(', ')}

${items}`.trim();
    })
    .join('\n\n');

  return `# ${profile.fullName}

> ${profile.headline}

${profile.summary}

- Location: ${profile.location}
- Email: ${profile.email}
- Site: ${origin}/${DEFAULT_LOCALE}
- Spanish site: ${origin}/es
- GitHub: ${profile.social.github}
- LinkedIn: ${profile.social.linkedin.startsWith('http') ? profile.social.linkedin : `https://${profile.social.linkedin}`}
- Resume: ${profile.resumeUrl}

Languages: Spanish (native), English (B2+), German (B2), Portuguese (B2).

## Stack

${stack}

${projectBlocks}

${groupBlocks}
`;
}

export function textResponse(body: string, contentType: string): Response {
  return new Response(body, {
    headers: {
      'content-type': contentType,
      'cache-control': 'public, max-age=3600',
    },
  });
}
