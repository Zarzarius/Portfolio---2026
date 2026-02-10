/**
 * Portfolio profile data — sourced from CV (Azael Alonso Campana, 2026).
 * Resume and image URLs use CDN_URL in production (e.g. https://cdn.azaelac.dev).
 */
const cdnUrl = import.meta.env.CDN_URL ?? '';
export const profile = {
  fullName: 'Azael Alonso Campana',
  shortName: 'Azael AC',
  tagline: 'Full-stack web developer',
  headline:
    '4+ years in React & Next.js — modern web apps, 3D experiences, and clean code.',
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
