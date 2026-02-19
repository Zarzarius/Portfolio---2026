import { profile } from './profile';

const siteUrl = import.meta.env.VITE_SITE_URL ?? '';
const cdnUrl = import.meta.env.VITE_CDN_URL ?? '';
// OG image from CDN (e.g. https://cdn.azaelac.dev/og-image.png — 1200×630 recommended)
const defaultOgImage = cdnUrl ? `${cdnUrl}/og-image.png` : `${siteUrl}/hero-aza.png`;

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
}) {
  const title = options?.title ?? `${profile.shortName} — ${profile.tagline}`;
  const description = options?.description ?? defaultDescription;
  const image = options?.image ?? defaultOgImage;
  const path = options?.path ?? '/';
  const url = path === '/' ? siteUrl : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      // Open Graph (Facebook, WhatsApp, LinkedIn, etc.)
      { property: 'og:type', content: 'website' as const },
      { property: 'og:site_name', content: profile.shortName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
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
          url: siteUrl,
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
