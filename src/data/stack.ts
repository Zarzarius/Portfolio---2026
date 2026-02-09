export interface StackTech {
  name: string;
  description?: string;
  highlight?: boolean;
}

export interface StackCategory {
  category: string;
  technologies: StackTech[];
}

export const techCategories: StackCategory[] = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'React', description: 'UI layer for most projects. Hooks, composition, and ecosystem.', highlight: true },
      { name: 'TypeScript', description: 'Typed JS everywhere. Fewer bugs, better DX.', highlight: true },
      { name: 'TanStack Router', description: 'Type-safe routing with loaders and search params.' },
      { name: 'Vite', description: 'Fast dev server and builds. Default choice for new apps.' },
      { name: 'Sass', description: 'Variables, mixins, and structure for maintainable styles.' },
      { name: 'React Three Fiber', description: 'React renderer for Three.js. 3D and WebGL when needed.' },
      { name: 'Zustand', description: 'Lightweight state. No boilerplate, scales well.' },
      { name: 'Next.js', description: 'SSR, static export, and Vercel when the project fits.' },
    ],
  },
  {
    category: 'Backend',
    technologies: [
      { name: 'Node.js', description: 'Runtime for APIs, scripts, and tooling.', highlight: true },
      { name: 'Strapi', description: 'Headless CMS with GraphQL and REST. Fast content backends.' },
      { name: 'Craft CMS', description: 'Flexible headless CMS for marketing and e-commerce.' },
      { name: 'Express', description: 'Minimal server framework. Middleware and routing.' },
      { name: 'MongoDB', description: 'Document store for flexible schemas and rapid iteration.' },
      { name: 'GraphQL', description: 'APIs when clients need precise, nested data.' },
      { name: 'REST API', description: 'Stable, cacheable endpoints for integrations.' },
      { name: 'WebSockets', description: 'Real-time updates and live features.' },
    ],
  },
  {
    category: 'DevOps & infra',
    technologies: [
      { name: 'Docker', description: 'Containers for consistent dev and deploy.', highlight: true },
      { name: 'AWS', description: 'Compute, storage, and services when we need scale.' },
      { name: 'GitLab', description: 'CI/CD, repos, and issue tracking in one place.' },
      { name: 'GitHub', description: 'Repos, Actions, and collaboration.' },
    ],
  },
  {
    category: 'Tools',
    technologies: [
      { name: 'Cursor', description: 'AI-assisted editing. Day-to-day coding.', highlight: true },
      { name: 'Git', description: 'Version control and branching workflows.' },
      { name: 'VS Code', description: 'Editor and extensions when not in Cursor.' },
      { name: 'GSAP', description: 'Complex animations and timeline-based motion.' },
      { name: 'Figma', description: 'Design handoff and UI specs.' },
      { name: 'Linux', description: 'Primary dev environment. Servers and desktop.' },
      { name: 'macOS', description: 'Secondary environment and Apple-specific work.' },
    ],
  },
];
