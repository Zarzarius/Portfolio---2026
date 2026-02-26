/**
 * Portfolio profile data — sourced from CV (Azael Alonso Campana, 2026).
 * Resume and image URLs use VITE_CDN_URL in production (e.g. https://cdn.azaelac.dev).
 * @see https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables#build-errors-in-production
 */
import { localizeValue, type Locale } from '../i18n';

const cdnUrl = import.meta.env.VITE_CDN_URL ?? '';
if (import.meta.env.PROD && !cdnUrl) {
  throw new Error(
    'Missing VITE_CDN_URL in production. Set it in .env.production or in your hosting platform (e.g. Vercel/Netlify) so the build has the CDN URL.',
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
  address: 'Schützenhofstraße 22, 51063 Köln',
  email: 'job@azaelac.dev',
  phone: '+49 176 21404156',
  resumeUrl: `${cdnUrl}/Resume/Azael_AC_EN.pdf`,
  summary:
    'Full-stack web developer with 4+ years of specialized experience in React and Next.js ecosystems. Skilled in building modern, responsive web applications and interactive 3D experiences. Proven track record in agile development environments, combining strong technical expertise with creative problem-solving. Passionate about clean code, performance optimization, and staying current with emerging web technologies.',
  social: {
    github: 'https://github.com/Zarzarius',
    linkedin: 'linkedin.com/in/azael-alonso-campana-5b1a49207',
  },
} as const;

const localizedProfile: Record<string, LocalizedText> = {
  tagline: {
    en: profile.tagline,
    es: 'Desarrollador web full-stack',
    de: 'Full-Stack-Webentwickler',
  },
  headline: {
    en: profile.headline,
    es: 'Mas de 4 anos creando aplicaciones web con React y Next.js: apps modernas, experiencias 3D y codigo limpio.',
    de: 'Seit uber 4 Jahren entwickle ich Webanwendungen mit React und Next.js: moderne Apps, 3D-Erlebnisse und sauberer Code.',
  },
  summary: {
    en: profile.summary,
    es: 'Desarrollador web full-stack con mas de 4 anos de experiencia especializada en el ecosistema React y Next.js. Construyo aplicaciones web modernas, responsivas y experiencias 3D interactivas. Tengo experiencia en entornos agiles, combinando solida capacidad tecnica con resolucion creativa de problemas. Me apasiona el codigo limpio, la optimizacion de rendimiento y mantenerme al dia con las tecnologias web emergentes.',
    de: 'Full-Stack-Webentwickler mit uber 4 Jahren spezialisierter Erfahrung im React- und Next.js-Okosystem. Ich entwickle moderne, responsive Webanwendungen und interaktive 3D-Erlebnisse. In agilen Teams verbinde ich starke technische Expertise mit kreativer Problemlosung. Meine Schwerpunkte sind sauberer Code, Performance-Optimierung und aktuelle Webtechnologien.',
  },
};

export function getProfile(locale: Locale) {
  return {
    ...profile,
    tagline: localizeValue(localizedProfile.tagline, profile.tagline, locale),
    headline: localizeValue(localizedProfile.headline, profile.headline, locale),
    summary: localizeValue(localizedProfile.summary, profile.summary, locale),
  };
}
