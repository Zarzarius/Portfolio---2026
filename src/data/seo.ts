import { getProfile } from './profile';
import {
  DEFAULT_LOCALE,
  getAlternateLocalePaths,
  getMessages,
  normalizeLocale,
} from '@/i18n';

const siteUrl = import.meta.env.VITE_SITE_URL ?? '';
const cdnUrl = import.meta.env.VITE_CDN_URL ?? '';
// Fallback so og:image and canonical are always absolute (required for WhatsApp/share crawlers)
const baseUrl = siteUrl || cdnUrl || 'https://azaelac.dev';
// OG image from CDN or site. Specs: 1200×630 px, PNG/JPG < 5 MB, 40px safe zone from edges, absolute URL.
const defaultOgImage = cdnUrl
  ? `${cdnUrl}/og-image.png`
  : `${baseUrl}/aza-hero.png`;

/** Platform limits for OG/Twitter (truncation beyond these hurts previews). */
const OG_TITLE_MAX_LENGTH = 60;
const OG_DESCRIPTION_MAX_LENGTH = 155;

function truncateForOg(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + '…';
}

/** Default SEO meta and links for the site (root). Child routes can override title/description. */
export function getDefaultSeoMeta(options?: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  pathnameWithoutLocale?: string;
  locale?: string;
  ogType?: 'website' | 'article';
  imageWidth?: number;
  imageHeight?: number;
}) {
  const locale = normalizeLocale(options?.locale);
  const t = getMessages(locale);
  const profile = getProfile(locale);
  const title = options?.title ?? `${profile.shortName} — ${profile.tagline}`;
  const description =
    options?.description ?? `${profile.headline} ${t.seo.defaultDescription}`;
  const rawImage = options?.image ?? defaultOgImage;
  const image =
    rawImage.startsWith('http://') || rawImage.startsWith('https://')
      ? rawImage
      : `${baseUrl}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`;
  const path = options?.path ?? '/';
  const pathnameWithoutLocale = options?.pathnameWithoutLocale ?? '/';
  const url =
    path === '/'
      ? baseUrl
      : `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const ogType = options?.ogType ?? 'website';
  const imageWidth = options?.imageWidth ?? 1200;
  const imageHeight = options?.imageHeight ?? 630;
  const ogTitle = truncateForOg(title, OG_TITLE_MAX_LENGTH);
  const ogDescription = truncateForOg(description, OG_DESCRIPTION_MAX_LENGTH);
  const alternates = getAlternateLocalePaths(pathnameWithoutLocale).map((entry) => ({
    rel: 'alternate',
    hrefLang: entry.locale,
    href: `${baseUrl}${entry.path}`,
  }));
  const xDefaultHref = `${baseUrl}/${DEFAULT_LOCALE}${
    pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale
  }`;

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      // Open Graph (Facebook, WhatsApp, LinkedIn, etc.) — title/description truncated to platform limits
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: profile.shortName },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: ogDescription },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: String(imageWidth) },
      { property: 'og:image:height', content: String(imageHeight) },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: t.seo.localeMeta },
      // Twitter Card (summary_large_image for best engagement)
      { name: 'twitter:card', content: 'summary_large_image' as const },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: ogDescription },
      { name: 'twitter:image', content: image },
    ],
    links: [
      { rel: 'canonical', href: url },
      ...alternates,
      { rel: 'alternate', hrefLang: 'x-default', href: xDefaultHref },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.fullName,
          jobTitle: profile.tagline,
          description: profile.summary,
          url: baseUrl,
          image: defaultOgImage,
          sameAs: [
            profile.social.github.startsWith('http')
              ? profile.social.github
              : `https://${profile.social.github}`,
            profile.social.linkedin.startsWith('http')
              ? profile.social.linkedin
              : `https://${profile.social.linkedin}`,
          ],
        }),
      },
    ],
  };
}
