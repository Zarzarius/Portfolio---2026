import { localizeValue, type Locale } from '@/i18n';
import type { StackCategory } from './stack';

type LocalizedText = Partial<Record<Locale, string>>;

const categoryTranslations: Record<string, LocalizedText> = {
  Frontend: {
    es: 'Frontend',
  },
  Backend: {
    es: 'Backend',
  },
  'DevOps & infra': {
    es: 'DevOps e infra',
  },
  Tools: {
    es: 'Herramientas',
  },
};

const technologyDescriptionTranslations: Record<string, LocalizedText> = {
  React: {
    es: 'Capa de UI para la mayoría de proyectos. Hooks, composición y ecosistema.',
  },
  TypeScript: {
    es: 'JavaScript tipado en todo el proyecto. Menos bugs y mejor DX.',
  },
  'Next.js': {
    es: 'SSR, export estático y Vercel cuando encaja con el proyecto.',
  },
  'TanStack Router': {
    es: 'Routing tipado con loaders y search params.',
  },
  Vite: {
    es: 'Servidor de desarrollo y builds rápidos. Opción por defecto para nuevas apps.',
  },
  Sass: {
    es: 'Variables, mixins y estructura para estilos mantenibles.',
  },
  'React Three Fiber': {
    es: 'Renderer de React para Three.js. 3D y WebGL cuando se necesita.',
  },
  Zustand: {
    es: 'Estado ligero. Sin boilerplate y escalable.',
  },
  Zod: {
    es: 'Validación de esquemas e inferencia de tipos para formularios y APIs.',
  },
  GSAP: {
    es: 'Animaciones complejas y motion basado en timeline.',
  },
  Motion: {
    es: 'Animaciones declarativas y gestos para React.',
  },
  'Node.js': {
    es: 'Runtime para APIs, scripts y tooling.',
  },
  Strapi: {
    es: 'CMS headless con GraphQL y REST. Backends de contenido rápidos.',
  },
  'Craft CMS': {
    es: 'CMS headless flexible para marketing y e-commerce.',
  },
  Express: {
    es: 'Framework de servidor minimalista. Middleware y routing.',
  },
  MongoDB: {
    es: 'Base de datos documental para esquemas flexibles e iteración rapida.',
  },
  GraphQL: {
    es: 'APIs cuando los clientes necesitan datos precisos y anidados.',
  },
  'REST API': {
    es: 'Endpoints estables y cacheables para integraciones.',
  },
  WebSockets: {
    es: 'Actualizaciones en tiempo real y funcionalidades live.',
  },
  Docker: {
    es: 'Contenedores para desarrollo y despliegue consistentes.',
  },
  GitLab: {
    es: 'CI/CD, repositorios y seguimiento de issues en un solo lugar.',
  },
  GitHub: {
    es: 'Repositorios, Actions y colaboración.',
  },
  Vercel: {
    es: 'Hosting frontend, serverless y despliegue edge.',
  },
  Cloudflare: {
    es: 'CDN, DNS, protección DDoS y edge workers.',
  },
  Cursor: {
    es: 'Edición asistida por IA para el trabajo diario.',
  },
  Git: {
    es: 'Control de versiones y flujos de ramas.',
  },
  'VS Code': {
    es: 'Editor y extensiones cuando no trabajo en Cursor.',
  },
  Figma: {
    es: 'Handoff de diseño y especificaciones de UI.',
  },
  Linux: {
    es: 'Entorno principal de desarrollo. Servidores y desktop.',
  },
  macOS: {
    es: 'Entorno secundario y trabajo específico de Apple.',
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

