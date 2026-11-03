/**
 * Portfolio profile data — sourced from CV (Azael Alonso Campana, 2026).
 * Resume and image URLs use VITE_CDN_URL in production (e.g. https://cdn.azaelac.dev).
 * @see https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables#build-errors-in-production
 */
import { localizeValue, type Locale } from '@/i18n';

const rawCdnUrl = import.meta.env.VITE_CDN_URL ?? '';
const siteUrl = import.meta.env.VITE_SITE_URL ?? '';
const cdnUrl = rawCdnUrl || siteUrl || '';

if (import.meta.env.PROD && !rawCdnUrl) {
  console.warn(
    'Missing VITE_CDN_URL in production. Falling back to VITE_SITE_URL (or relative paths if unset). Configure VITE_CDN_URL in your hosting environment.',
  );
}

type LocalizedText = Partial<Record<Locale, string>>;

export const profile = {
  fullName: 'Azael Alonso Campana',
  shortName: 'Azael AC',
  tagline: 'Full-stack web developer',
  headline:
    '4+ years building web applications in React & Next.js — modern web apps, 3D experiences and clean code.',
  location: 'Köln, Germany',
  email: 'job@azaelac.dev',
  phone: '+49 176 21404156',
  resumeUrl: `${cdnUrl}/Resume/Azael_AC_EN.pdf`,
  summary:
    'Full-stack web developer with 4+ years of specialized experience in React and Next.js ecosystems. Skilled in building modern, responsive web applications and interactive 3D experiences. Proven track record in agile development environments, combining strong technical expertise with creative problem-solving. Passionate about clean code, performance optimization, and staying current with emerging web technologies.',
  social: {
    github: 'https://github.com/Zarzarius',
    linkedin: 'https://www.linkedin.com/in/azael-alonso-campana-5b1a49207',
  },
} as const;

const localizedProfile: Record<string, LocalizedText> = {
  tagline: {
    en: profile.tagline,
    es: 'Desarrollador web full-stack',
  },
  headline: {
    en: profile.headline,
    es: 'Más de 4 años creando aplicaciones web con React y Next.js: apps modernas, experiencias 3D y código limpio.',
  },
  summary: {
    en: profile.summary,
    es: 'Desarrollador web full-stack con más de 4 años de experiencia especializada en el ecosistema React y Next.js. Construyo aplicaciones web modernas, responsivas y experiencias 3D interactivas. Tengo experiencia en entornos ágiles, combinando sólida capacidad técnica con resolución creativa de problemas. Me apasiona el código limpio, la optimización de rendimiento y mantenerme al día con las tecnologías web emergentes.',
  },
};

export function getProfile(locale: Locale) {
  return {
    ...profile,
    resumeUrl: `${cdnUrl}/Resume/Azael_AC_${locale.toUpperCase()}.pdf`,
    tagline: localizeValue(localizedProfile.tagline, profile.tagline, locale),
    headline: localizeValue(localizedProfile.headline, profile.headline, locale),
    summary: localizeValue(localizedProfile.summary, profile.summary, locale),
  };
}
