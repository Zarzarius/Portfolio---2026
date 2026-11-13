import { getProfile } from './profile';
import {
  DEFAULT_LOCALE,
  getAlternateLocalePaths,
  getMessages,
  normalizeLocale,
  SUPPORTED_LOCALES,
  toLocalizedPath,
  type Locale,
} from '@/i18n';

const CANONICAL_ORIGIN = 'https://www.azaelac.dev';

export function getSiteOrigin(): string {
  const configured = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '');
  if (
    !configured ||
    configured === 'https://azaelac.dev' ||
    configured === 'http://azaelac.dev'
  ) {
    return CANONICAL_ORIGIN;
  }
  return configured;
}

export function absoluteAssetUrl(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cdn = (import.meta.env.VITE_CDN_URL ?? '').replace(/\/$/, '');
  const base = cdn || getSiteOrigin();
  return `${base}/${path.replace(/^\//, '')}`;
}

const OG_TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

function truncate(text: string, maxLength: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  const cut = normalized.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const base = (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(
    /[.,;:–—-]+$/,
    '',
  );
  return `${base}…`;
}

function absolutePageUrl(origin: string, path: string): string {
  if (path === '/') return origin;
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}

export type SeoKind = 'home' | 'about' | 'projects' | 'contact' | 'work';

export type SeoListItem = {
  name: string;
  path: string;
};

export type SeoWork = {
  name: string;
  description: string;
  technologies?: string[];
  award?: string;
  image?: string;
};

function sameAs(profile: ReturnType<typeof getProfile>): string[] {
  return [profile.social.github, profile.social.linkedin].map((url) =>
    url.startsWith('http') ? url : `https://${url}`,
  );
}

function personId(origin: string): string {
  return `${origin}/#person`;
}

function websiteId(origin: string): string {
  return `${origin}/#website`;
}

function buildJsonLd(options: {
  origin: string;
  locale: Locale;
  url: string;
  title: string;
  description: string;
  image: string;
  kind: SeoKind;
  listItems?: SeoListItem[];
  work?: SeoWork;
}) {
  const profile = getProfile(options.locale);
  const t = getMessages(options.locale);
  const person = {
    '@type': 'Person',
    '@id': personId(options.origin),
    name: profile.fullName,
    alternateName: profile.shortName,
    jobTitle: profile.tagline,
    description: profile.summary,
    url: absolutePageUrl(options.origin, `/${options.locale}`),
    image: options.image,
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Galicia',
      addressCountry: 'ES',
    },
    knowsLanguage: ['Spanish', 'English', 'German', 'Portuguese'],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'WebAR',
      'React Three Fiber',
      'Sanity',
      'Headless CMS',
    ],
    sameAs: sameAs(profile),
  };
  const website = {
    '@type': 'WebSite',
    '@id': websiteId(options.origin),
    name: profile.fullName,
    alternateName: profile.shortName,
    url: absolutePageUrl(options.origin, `/${DEFAULT_LOCALE}`),
    description: profile.summary,
    inLanguage: [...SUPPORTED_LOCALES],
    publisher: { '@id': person['@id'] },
  };

  const pageType = {
    home: 'ProfilePage',
    about: 'AboutPage',
    projects: 'CollectionPage',
    contact: 'ContactPage',
    work: 'WebPage',
  } satisfies Record<SeoKind, string>;

  const page: Record<string, unknown> = {
    '@type': pageType[options.kind],
    '@id': `${options.url}#webpage`,
    url: options.url,
    name: options.title,
    description: options.description,
    inLanguage: options.locale,
    isPartOf: { '@id': website['@id'] },
    about: { '@id': person['@id'] },
  };

  if (options.kind === 'home' || options.kind === 'about' || options.kind === 'contact') {
    page.mainEntity = { '@id': person['@id'] };
  }

  const homeUrl = absolutePageUrl(options.origin, `/${options.locale}`);
  const projectsUrl = absolutePageUrl(
    options.origin,
    `/${options.locale}/projects`,
  );
  const crumbName = {
    home: t.nav.home,
    about: t.nav.about,
    projects: t.nav.projects,
    contact: t.nav.contact,
    work: options.work?.name ?? options.title,
  } satisfies Record<SeoKind, string>;
  const crumbUrl = {
    home: homeUrl,
    about: absolutePageUrl(options.origin, `/${options.locale}/about`),
    projects: projectsUrl,
    contact: absolutePageUrl(options.origin, `/${options.locale}/contact`),
    work: options.url,
  } satisfies Record<SeoKind, string>;

  const crumbs =
    options.kind === 'home'
      ? [{ name: t.nav.home, item: homeUrl }]
      : [
          { name: t.nav.home, item: homeUrl },
          ...(options.kind === 'work'
            ? [{ name: t.nav.projects, item: projectsUrl }]
            : []),
          { name: crumbName[options.kind], item: crumbUrl[options.kind] },
        ];

  const graph: unknown[] = [
    website,
    person,
    page,
    {
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    },
  ];

  if (options.kind === 'projects' && options.listItems?.length) {
    graph.push({
      '@type': 'ItemList',
      itemListElement: options.listItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absolutePageUrl(options.origin, item.path),
      })),
    });
  }

  if (options.kind === 'work' && options.work) {
    graph.push({
      '@type': 'CreativeWork',
      name: options.work.name,
      headline: options.work.name,
      description: options.work.description,
      url: options.url,
      image: options.work.image,
      keywords: options.work.technologies?.join(', '),
      award: options.work.award,
      inLanguage: options.locale,
      author: { '@id': person['@id'] },
      creator: { '@id': person['@id'] },
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function getDefaultSeoMeta(options?: {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  path?: string;
  pathnameWithoutLocale?: string;
  locale?: string;
  ogType?: 'website' | 'article';
  kind?: SeoKind;
  listItems?: SeoListItem[];
  work?: SeoWork;
  noindex?: boolean;
}) {
  const origin = getSiteOrigin();
  const locale = normalizeLocale(options?.locale);
  const t = getMessages(locale);
  const profile = getProfile(locale);
  const kind = options?.kind ?? 'home';
  const title = (options?.title ?? t.seo.homeTitle).replace(/\s+/g, ' ').trim();
  const ogTitle = truncate(title, OG_TITLE_MAX);
  const description = truncate(
    options?.description ?? t.seo.homeDescription,
    DESCRIPTION_MAX,
  );
  const defaultOgImage = `${origin}/og-image.png`;
  const image = options?.image ?? defaultOgImage;
  const imageAlt = options?.imageAlt ?? `${profile.fullName}, ${profile.tagline}`;
  const path = options?.path ?? `/${locale}`;
  const pathnameWithoutLocale = options?.pathnameWithoutLocale ?? '/';
  const url = absolutePageUrl(origin, path);
  const ogType = options?.ogType ?? 'website';
  const usingDefaultImage = !options?.image;
  const alternates = getAlternateLocalePaths(pathnameWithoutLocale).map(
    (entry) => ({
      rel: 'alternate' as const,
      hrefLang: entry.locale,
      href: `${origin}${entry.path}`,
    }),
  );
  const xDefaultHref = `${origin}${toLocalizedPath(pathnameWithoutLocale, DEFAULT_LOCALE)}`;
  const alternateOgLocales = SUPPORTED_LOCALES.filter(
    (entry) => entry !== locale,
  ).map((entry) => ({
    property: 'og:locale:alternate',
    content: getMessages(entry).seo.localeMeta,
  }));

  const robots = options?.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { name: 'author', content: profile.fullName },
      { name: 'robots', content: robots },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: profile.fullName },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      ...(usingDefaultImage
        ? [
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
          ]
        : []),
      { property: 'og:image:alt', content: imageAlt },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: t.seo.localeMeta },
      ...alternateOgLocales,
      { name: 'twitter:card', content: 'summary_large_image' as const },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: imageAlt },
    ],
    links: options?.noindex
      ? []
      : [
          { rel: 'canonical', href: url },
          ...alternates,
          { rel: 'alternate', hrefLang: 'x-default', href: xDefaultHref },
        ],
    scripts: options?.noindex
      ? []
      : [
          {
            type: 'application/ld+json',
            children: JSON.stringify(
              buildJsonLd({
                origin,
                locale,
                url,
                title,
                description,
                image: defaultOgImage,
                kind,
                listItems: options?.listItems,
                work: options?.work,
              }),
            ),
          },
        ],
  };
}
