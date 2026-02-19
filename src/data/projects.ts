export type ProjectType = 'professional' | 'personal';

export type Category = 'Demodern' | 'Dart Design' | 'Personal';

export const categories: Category[] = ['Demodern', 'Dart Design', 'Personal'];

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  priority?: string;
  link?: string;
  category: Category;
  image?: string;
  imageAlt?: string;
  award?: string;
  achievements?: string[];
  type: ProjectType;
  /** When true, project is shown on the home page "Selected work" section */
  highlighted?: boolean;
}

/** Minor project shown inline inside a ProjectGroup (no dedicated detail page). */
export interface ProjectGroupItem {
  id: string | number;
  title: string;
  description?: string;
  link?: string;
}

/** Collection of minor projects that share common technologies. */
export interface ProjectGroup {
  id: number;
  title: string;
  description?: string;
  technologies: string[];
  items: ProjectGroupItem[];
  category: Category;
  type: ProjectType;
  /** When true, group is shown on the home page "Selected work" section */
  highlighted?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'WWF Germany - Augmented Reality & GIS data visualisation',
    description:
      'WebAR experience for WWF Germany: no native app—users access AR directly from the mobile browser, maximising reach and accessibility. Built with Google’s open-source model-viewer for high-quality 3D and AR on the web, and React for a fluid, intuitive UI. Includes a GIS-based data-visualisation module showing real animal habitats, high-fidelity animated 3D animals (lynx, wolf, European bison, elk) optimised for mobile, and interactive hotspots that trigger educational content.',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'ZUSTAND',
      'MATERIAL UI',
      'MODEL-VIEWER',
      'WEBAR',
      'GIS / DATA VISUALISATION',
    ],
    priority: 'A',
    award: 'Lovie Awards Bronze for “Best use of Augmented Reality”',
    achievements: [
      'Shipped WebAR experience with no native app; users access AR from the mobile browser, increasing reach and avoiding app-store friction.',
      'Delivered multiplatform experience: AR on mobile and 3D viewer on desktop using a single codebase with model-viewer.',
      'Integrated GIS-based data visualisation to show real animal habitats within the experience.',
      'Shipped high-fidelity, animated 3D animals (lynx, wolf, European bison, elk) optimised for real-time rendering on mobile browsers.',
      'Implemented interactive hotspots on 3D models to surface educational content and scientific data at 1:1 scale.',
    ],
    link: 'https://www.wwf.de/aktiv-werden/augmented-reality/',
    category: 'Demodern',
    type: 'professional',
    highlighted: true,
  },
  {
    id: 2,
    title: 'SAP S/4HANA Cloud AR Hybrid Event Showcase',
    description:
      'A global hybrid event solution that uses AR to visualize SAP’s S/4HANA Cloud business processes, transforming abstract data into an interactive "business muscle" metaphor.',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'REACT THREE FIBER',
      'WEBGL',
      '8TH WALL',
      'LOTTIE FILES',
      'GSAP',
    ],
    priority: 'A',
    achievements: [
      'Delivered hybrid event solution that uses AR to visualize SAP’s S/4HANA Cloud business processes, transforming abstract data into an interactive "business muscle" metaphor.',
      'Shipped high-fidelity, animated 3D business processes (SAP’s S/4HANA Cloud business processes) optimised for real-time rendering on mobile browsers.',
      'Delivered multiplatform experience: AR on mobile and 3D viewer on desktop using a single codebase with React Three Fiber and 8th Wall',
      'Implemented complex UI interactions with React Three Fiber and Three.js to create an immersive and interactive experience.',
    ],
    link: 'https://demodern.de/projekte/sap-ar-hybrid-event-showcase',
    category: 'Demodern',
    type: 'professional',
    highlighted: true,
  },
  {
    id: 3,
    title: 'Snipes Soundbooth - Landing page & on-site installation',
    description:
      'Snipes Soundbooth is a platform that allows users to create and share audio clips with their friends. A landing page was also developed to showcase the Soundbooth and the features it offers.',
    technologies: ['REACT', 'TYPESCRIPT', 'ZUSTAND', 'STRAPI'],
    achievements: [
      'Developed a responsive web application for Snipes Soundbooth using React and TypeScript.',
      'Integrated the Snipes API to fetch the audio clips.',
      'Implemented a responsive design for the Soundbooth.',
      'On site installation and maintenance of the Soundbooth.',
    ],
    link: 'https://demodern.com/projects/snipes-soundbooth',
    category: 'Demodern',
    type: 'professional',
    highlighted: true,
  },
  {
    id: 4,
    title: 'Miniverse - Digital Metaverse Gamified Platform',
    description:
      'Miniverse is a digital metaverse gamified platform for Mini that allows users to explore a virtual world and interact with other users. It is built with React and React Three Fiber. The platform is designed to be a fun and engaging experience for users to explore the virtual world and interact with other users. Live server networking with WebSockets.',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'ZUSTAND',
      'GSAP',
      'REACT THREE FIBER',
      'WEBSOCKETS',
    ],
    type: 'professional',
    achievements: [
      'Shipped digital metaverse gamified platform for Mini that allows users to explore a virtual world and interact with other users.',
      'Networking with WebSockets to create a real-time multiplayer experience for the users.',
      'Implemented a responsive design for the platform.',
      'Implementing new features and improvements to the platform.',
    ],
    link: 'https://demodern.com/projects/miniverse',
    category: 'Demodern',
  },
  {
    id: 5,
    title: 'Virtual experience metaverse - Metaverse platform for brands',
    description:
      'Virtual experience metaverse is a platform that allows brands to create a virtual experience for their users. It is built with React and React Three Fiber. The platform is designed to be a fun and engaging experience for users to explore the virtual world and interact with other users and showcase their products. Live server networking with WebSockets and live chat with social features.',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'ZUSTAND',
      'GSAP',
      'REACT THREE FIBER',
      'WEBSOCKETS',
    ],
    type: 'professional',
    achievements: [
      'Shipped metaverse platform for brands that allows users to explore a virtual experience and interact with other users and showcase their products.',
      'Networking with WebSockets to create a real-time experience for the users.',
      'Implementing new features like sound effects, and improvements to the platform.',
    ],
    link: 'https://demodern.de/services/corporate-metaverse-cases-ve',
    category: 'Demodern',
  },
  {
    id: 6,
    title: 'Migros Digital Escape Game landing page',
    description: 'Migros escape game landing page to promote the escape game.',
    technologies: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'ZUSTAND', 'MOTION'],
    achievements: [
      'Shipped landing page for Migros 2025 escape game.',
      'Implemented a responsive design for the platform.',
    ],
    link: 'https://demodern.de/projekte/migros-digital-escape-game',
    category: 'Demodern',
    type: 'professional',
  },
  {
    id: 7,
    title: 'Portfolio website',
    description:
      'Personal portfolio and contact hub built with a modern, type-safe stack. Features a project showcase with server-driven data, a contact form with validated submissions and Resend-powered email delivery, and responsive layout with SCSS. Designed for fast loads and clear information hierarchy.',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'VITE',
      'TANSTACK ROUTER',
      'TANSTACK START',
      'RESEND',
      'ZOD',
      'SASS',
    ],
    achievements: [
      'Built full-stack portfolio with TanStack Start: file-based routing, server loaders, and type-safe data fetching for the project list.',
      'Implemented contact form with Zod validation and Resend integration for reliable email delivery.',
      'Structured project data and filtering (professional vs personal, highlighted work) for the home and projects pages.',
      'Responsive design and SCSS modules for maintainable styling across hero, projects, and contact sections.',
    ],
    category: 'Personal',
    type: 'personal',
    highlighted: true,
  },
];

export const projectGroups: ProjectGroup[] = [
  {
    id: 1,
    title: 'Campaign landing pages',
    description:
      'High-quality marketing and campaign landing pages built with React and shared tooling. Each page is designed for clear conversion goals, strong visual hierarchy, and fast load times. Focus on brand storytelling, campaign messaging, and measurable outcomes for clients.',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'NEXT.JS',
      'MOTION',
      'GSAP',
      'LOTTIE FILES',
      'ZUSTAND',
      'REACT THREE FIBER',
    ],
    items: [
      {
        id: 'lp-1',
        title: 'Migros Escape Game',
        description:
          'Landing page for Migros 2025 escape game campaign for the supermarket chain Migros.',
        link: 'https://demodern.de/projekte/migros-digital-escape-game',
      },
      {
        id: 'lp-2',
        title: 'Snipes 25th Anniversary',
        description:
          'Landing page for Snipes 25th Anniversary campaign with exclusive 3D models and showcase of the products.',
        link: 'https://demodern.de/projekte/snipes-25th-anniversary',
      },
      {
        id: 'lp-3',
        title: 'Snipes Soundbooth',
        description: 'Landing page for Snipes Soundbooth.',
        link: 'https://demodern.de/projekte/snipes-soundbooth',
      },
    ],
    category: 'Demodern',
    type: 'professional',
  },
  {
    id: 2,
    title: "D'Art Design Group corporative landing pages",
    description:
      "Landing pages for clients of D'Art Design Group. The landing pages are built with Next.js and the technologies mentioned above.",
    technologies: [
      'NEXT.JS',
      'TYPESCRIPT',
      'ZUSTAND',
      'MOTION',
      'GSAP',
      'LOTTIE FILES',
      'CRAFT CMS',
      'GRAPHQL',
      'ZOD',
      'SASS',
    ],
    items: [
      {
        id: 'corporative-lp-1',
        title: "D'Art Digital Agency landing page",
        description:
          "Landing page for D'Art Digital Agency to show their services and portfolio.",
        link: 'https://d-art-digital.de/de',
      },
      {
        id: 'corporative-lp-2',
        title: 'Stiftung Paulinenhilfe corporative landing page',
        description:
          'Landing page for Stiftung Paulinenhilfe to show their services',
        link: 'https://d-art-digital.de/de/projects/stiftung-paulinenhilfe',
      },
      {
        id: 'corporative-lp-3',
        title: 'Medienvorsorge.de landing page',
        description:
          'Landing page for Medienvorsorge.de to show their services',
        link: 'https://d-art-digital.de/de/projects/medienvorsorge',
      },
      {
        id: 'corporative-lp-4',
        title: 'Hanselmann & Compagnie corporative landing page',
        description:
          'Landing page for Hanselmann & Compagnie to show their services',
        link: 'https://d-art-digital.de/de/projects/hanselmann-compagnie',
      },
    ],
    category: 'Dart Design',
    type: 'professional',
  },
  {
    id: 3,
    title: 'Personal projects',
    technologies: ['ASTRO', 'TYPESCRIPT', 'ZOD', 'SASS'],
    items: [],
    category: 'Personal',
    type: 'personal',
  },
];
