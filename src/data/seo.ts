import { profile } from './profile';

const siteUrl = import.meta.env.VITE_SITE_URL ?? '';
const cdnUrl = import.meta.env.VITE_CDN_URL ?? '';
// Fallback so og:image and canonical are always absolute (required for WhatsApp/share crawlers)
const baseUrl = siteUrl || cdnUrl || 'https://azaelac.dev';
// OG image from CDN or site (1200×630 recommended; must be absolute URL)
const defaultOgImage = cdnUrl ? `${cdnUrl}/og-image.png` : `${baseUrl}/hero-aza.png`;

/** Short description for meta and social (≈155 chars). */
const defaultDescription =
  profile.headline +
  ' React, Next.js, 3D experiences, headless CMS. Portfolio — Azael Alonso Campana.';

/** Default SEO meta and links for the site (root). Child routes can override title/description. */
export function getDefaultSeoMeta(options?: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  ogType?: 'website' | 'article';
  imageWidth?: number;
  imageHeight?: number;
}) {
  const title = options?.title ?? `${profile.shortName} — ${profile.tagline}`;
  const description = options?.description ?? defaultDescription;
  const image = options?.image ?? defaultOgImage;
  const path = options?.path ?? '/';
  const url = path === '/' ? baseUrl : `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const ogType = options?.ogType ?? 'website';
  const imageWidth = options?.imageWidth ?? 1200;
  const imageHeight = options?.imageHeight ?? 630;

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      // Open Graph (Facebook, WhatsApp, LinkedIn, etc.)
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: profile.shortName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: String(imageWidth) },
      { property: 'og:image:height', content: String(imageHeight) },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: 'en_US' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' as const },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: [{ rel: 'canonical', href: url }],
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
            profile.social.github.startsWith('http') ? profile.social.github : `https://${profile.social.github}`,
            profile.social.linkedin.startsWith('http') ? profile.social.linkedin : `https://${profile.social.linkedin}`,
          ],
        }),
      },
    ],
  };
}
