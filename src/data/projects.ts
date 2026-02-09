export type ProjectType = 'professional' | 'hobby';

export const projects = [
  {
    id: 1,
    title: 'React & Next.js web applications',
    description:
      'Architected and built responsive web apps with React 18+ and Next.js 14: App Router, server components, and optimized data fetching. Improved Core Web Vitals through code splitting and lazy loading.',
    technologies: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'ZUSTAND'],
    priority: 'A',
    category: 'interface',
    type: 'professional' as ProjectType,
  },
  {
    id: 2,
    title: '3D product visualizations & virtual showrooms',
    description:
      'Created immersive 3D web experiences with React Three Fiber and Three.js — interactive product configurators and virtual showrooms with real-time rendering.',
    technologies: ['REACT', 'THREE.JS', 'R3F', 'WEBGL'],
    priority: 'A',
    category: 'graphics',
    type: 'professional' as ProjectType,
  },
  {
    id: 3,
    title: 'Headless CMS & content platforms',
    description:
      'Integrated Strapi and Craft CMS with GraphQL APIs for marketing and e-commerce, enabling flexible content management and structured data flows.',
    technologies: ['STRAPI', 'CRAFT CMS', 'GRAPHQL', 'NODE.JS'],
    category: 'interface',
    type: 'professional' as ProjectType,
  },
  {
    id: 4,
    title: 'Interactive digital experiences',
    description:
      'Built high-profile client projects at Demodern: custom UI components, design systems, and complex animations with GSAP and CSS. Mobile-first, responsive layouts.',
    technologies: ['REACT', 'GSAP', 'TYPESCRIPT', 'FIGMA'],
    category: 'interface',
    type: 'professional' as ProjectType,
  },
  {
    id: 5,
    title: 'WebGL & 3D experiences',
    description:
      'Developed interactive 3D visualizations and WebGL experiences with Three.js, balancing performance and browser capabilities for creative campaigns.',
    technologies: ['THREE.JS', 'WEBGL', 'JAVASCRIPT', 'CSS'],
    category: 'graphics',
    type: 'professional' as ProjectType,
  },
  {
    id: 6,
    title: 'Full-stack MERN applications',
    description:
      'Hands-on full-stack projects from bootcamp and side work: REST APIs, async data flows, and deployment. MongoDB, Express, React, Node.js.',
    technologies: ['REACT', 'NODE.JS', 'EXPRESS', 'MONGODB'],
    category: 'backend',
    type: 'hobby' as ProjectType,
  },
];

export const categories = [
  'ALL_SYSTEMS',
  'FRONT_END',
  'BACK_END',
  '3D_GRAPHICS',
];

export const showcaseProjects = [
  {
    id: 1,
    title: 'React & Next.js applications',
    description:
      'Responsive web applications with React 18+, Next.js 14 (App Router, server components), and optimized data fetching. Focus on Core Web Vitals and maintainable architecture.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Zustand'],
  },
  {
    id: 2,
    title: '3D product experiences',
    description:
      'Immersive 3D web experiences with React Three Fiber and Three.js: interactive product visualizations and virtual showrooms with real-time rendering.',
    technologies: ['React Three Fiber', 'Three.js', 'WebGL', 'TypeScript'],
  },
  {
    id: 3,
    title: 'Headless CMS integrations',
    description:
      'Content platforms powered by Strapi and Craft CMS with GraphQL APIs, supporting marketing sites and e-commerce with flexible content workflows.',
    technologies: ['Strapi', 'Craft CMS', 'GraphQL', 'Node.js'],
  },
];
