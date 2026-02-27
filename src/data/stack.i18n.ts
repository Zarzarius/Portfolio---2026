import { localizeValue, type Locale } from '@/i18n';
import type { StackCategory } from './stack';

type LocalizedText = Partial<Record<Locale, string>>;

const categoryTranslations: Record<string, LocalizedText> = {
  Frontend: {
    es: 'Frontend',
    de: 'Frontend',
  },
  Backend: {
    es: 'Backend',
    de: 'Backend',
  },
  'DevOps & infra': {
    es: 'DevOps e infra',
    de: 'DevOps und Infrastruktur',
  },
  Tools: {
    es: 'Herramientas',
    de: 'Werkzeuge',
  },
};

const technologyDescriptionTranslations: Record<string, LocalizedText> = {
  React: {
    es: 'Capa de UI para la mayoria de proyectos. Hooks, composicion y ecosistema.',
    de: 'UI-Schicht fur die meisten Projekte. Hooks, Komposition und Okosystem.',
  },
  TypeScript: {
    es: 'JavaScript tipado en todo el proyecto. Menos bugs y mejor DX.',
    de: 'Typisiertes JavaScript im ganzen Projekt. Weniger Bugs, bessere DX.',
  },
  'Next.js': {
    es: 'SSR, export statico y Vercel cuando encaja con el proyecto.',
    de: 'SSR, statischer Export und Vercel, wenn es zum Projekt passt.',
  },
  'TanStack Router': {
    es: 'Routing tipado con loaders y search params.',
    de: 'Typsicheres Routing mit Loadern und Search-Params.',
  },
  Vite: {
    es: 'Servidor de desarrollo y builds rapidos. Opcion por defecto para nuevas apps.',
    de: 'Schneller Dev-Server und schnelle Builds. Standardwahl fur neue Apps.',
  },
  Sass: {
    es: 'Variables, mixins y estructura para estilos mantenibles.',
    de: 'Variablen, Mixins und Struktur fur wartbare Styles.',
  },
  'React Three Fiber': {
    es: 'Renderer de React para Three.js. 3D y WebGL cuando se necesita.',
    de: 'React-Renderer fur Three.js. 3D und WebGL bei Bedarf.',
  },
  Zustand: {
    es: 'Estado ligero. Sin boilerplate y escalable.',
    de: 'Leichtgewichtiges State-Management. Ohne Boilerplate und gut skalierbar.',
  },
  Zod: {
    es: 'Validacion de esquemas e inferencia de tipos para formularios y APIs.',
    de: 'Schema-Validierung und Typinferenz fur Formulare und APIs.',
  },
  GSAP: {
    es: 'Animaciones complejas y motion basado en timeline.',
    de: 'Komplexe Animationen und timeline-basiertes Motion-Design.',
  },
  Motion: {
    es: 'Animaciones declarativas y gestos para React.',
    de: 'Deklarative Animationen und Gesten fur React.',
  },
  'Node.js': {
    es: 'Runtime para APIs, scripts y tooling.',
    de: 'Runtime fur APIs, Skripte und Tooling.',
  },
  Strapi: {
    es: 'CMS headless con GraphQL y REST. Backends de contenido rapidos.',
    de: 'Headless CMS mit GraphQL und REST. Schnelle Content-Backends.',
  },
  'Craft CMS': {
    es: 'CMS headless flexible para marketing y e-commerce.',
    de: 'Flexibles Headless CMS fur Marketing und E-Commerce.',
  },
  Express: {
    es: 'Framework de servidor minimalista. Middleware y routing.',
    de: 'Minimalistisches Server-Framework. Middleware und Routing.',
  },
  MongoDB: {
    es: 'Base de datos documental para esquemas flexibles e iteracion rapida.',
    de: 'Dokumenten-Datenbank fur flexible Schemas und schnelle Iteration.',
  },
  GraphQL: {
    es: 'APIs cuando los clientes necesitan datos precisos y anidados.',
    de: 'APIs, wenn Clients prazise und verschachtelte Daten brauchen.',
  },
  'REST API': {
    es: 'Endpoints estables y cacheables para integraciones.',
    de: 'Stabile, cachebare Endpunkte fur Integrationen.',
  },
  WebSockets: {
    es: 'Actualizaciones en tiempo real y funcionalidades live.',
    de: 'Echtzeit-Updates und Live-Features.',
  },
  Docker: {
    es: 'Contenedores para desarrollo y despliegue consistentes.',
    de: 'Container fur konsistente Entwicklung und Deployments.',
  },
  GitLab: {
    es: 'CI/CD, repositorios y seguimiento de issues en un solo lugar.',
    de: 'CI/CD, Repositories und Issue-Tracking an einem Ort.',
  },
  GitHub: {
    es: 'Repositorios, Actions y colaboracion.',
    de: 'Repositories, Actions und Zusammenarbeit.',
  },
  Vercel: {
    es: 'Hosting frontend, serverless y despliegue edge.',
    de: 'Frontend-Hosting, Serverless und Edge-Deployment.',
  },
  Cloudflare: {
    es: 'CDN, DNS, proteccion DDoS y edge workers.',
    de: 'CDN, DNS, DDoS-Schutz und Edge-Worker.',
  },
  Cursor: {
    es: 'Edicion asistida por IA para el trabajo diario.',
    de: 'KI-unterstutzte Bearbeitung fur die tagliche Entwicklung.',
  },
  Git: {
    es: 'Control de versiones y flujos de ramas.',
    de: 'Versionskontrolle und Branch-Workflows.',
  },
  'VS Code': {
    es: 'Editor y extensiones cuando no trabajo en Cursor.',
    de: 'Editor und Erweiterungen, wenn ich nicht in Cursor arbeite.',
  },
  Figma: {
    es: 'Handoff de diseno y especificaciones de UI.',
    de: 'Design-Handoff und UI-Spezifikationen.',
  },
  Linux: {
    es: 'Entorno principal de desarrollo. Servidores y desktop.',
    de: 'Primare Entwicklungsumgebung. Server und Desktop.',
  },
  macOS: {
    es: 'Entorno secundario y trabajo especifico de Apple.',
    de: 'Sekundare Umgebung und Apple-spezifische Arbeit.',
  },
};

export function getLocalizedStack(
  categories: StackCategory[],
  locale: Locale,
): StackCategory[] {
  return categories.map((category) => ({
    ...category,
    category: localizeValue(
      categoryTranslations[category.category],
      category.category,
      locale,
    ),
    technologies: category.technologies.map((tech) => ({
      ...tech,
      description: tech.description
        ? localizeValue(
            technologyDescriptionTranslations[tech.name],
            tech.description,
            locale,
          )
        : tech.description,
    })),
  }));
}

