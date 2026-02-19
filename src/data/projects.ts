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
      'Material UI',
      'model-viewer',
      'WebAR',
      'GIS / data visualisation',
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
  },
  {
    id: 2,
    title: 'SAP AR Hybrid Event Showcase',
    description:
      'A global hybrid event solution that uses AR to visualize SAP’s S/4HANA Cloud business processes, transforming abstract data into an interactive "business muscle" metaphor.',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'React Three Fiber',
      'WebGL',
      '8th Wall',
      'Lottie Files',
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
  },
  {
    id: 3,
    title: 'Snipes Soundbooth - Landingpage & On site installation',
    description:
      'Snipes Soundbooth is a platform that allows users to create and share audio clips with their friends. A landingpage was also developed to showcase the Soundbooth and the features it offers.',
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
  },
  {
    id: 4,
    title: 'Miniverse - Digital Metaverse Gamified Platform',
    description:
      'Miniverse is a digital metaverse gamified platform for Mini that allows users to explore a virtual world and interact with other users. It is built with React and React Three Fiber. The platform is designed to be a fun and engaging experience for users to explore the virtual world and interact with other users. Live server networking with Websokets',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'ZUSTAND',
      'GSAP',
      'React Three Fiber',
      'Websockets',
    ],
    type: 'professional',
    achievements: [
      'Shipped digital metaverse gamified platform for Mini that allows users to explore a virtual world and interact with other users.',
      'Networking with Websockets to create a real-time multiplayer experience for the users.',
      'Implemented a responsive design for the platform.',
      'Implementing new features and improvements to the platform.',
    ],
    link: 'https://demodern.com/projects/miniverse',
    category: 'Demodern',
  },
  {
    id: 5,
    title: 'Virtual exeprience metaverse - Metaverse Platform for brands',
    description:
      'Virtual experience metaverse is a platform that allows brands to create a virtual experience for their users. It is built with React and React Three Fiber. The platform is designed to be a fun and engaging experience for users to explore the virtual world and interact with other users and showcase their products. Live server networking with Websokets and live chat with social features',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'ZUSTAND',
      'GSAP',
      'React Three Fiber',
      'Websockets',
    ],
    type: 'professional',
    achievements: [
      'Shipped metaverse platform for brands that allows users to explore a virtual experience and interact with other users and showcase their products.',
      'Networking with Websockets to create a real-time experience for the users.',
      'Implementing new features like sound effects, and improvements to the platform.',
    ],
    link: 'https://demodern.de/services/corporate-metaverse-cases-ve',
    category: 'Demodern',
  },
  {
    id: 6,
    title: 'Migros Escape Game landingpage',
    description: 'Migros escape game landingpage to promote the escape game.',
    technologies: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'ZUSTAND', 'MOTION'],
    achievements: [
      'Shipped landingpage for Migros 2025 escape game.',
      'Implemented a responsive design for the platform.',
    ],
    link: 'https://demodern.de/projekte/migros-digital-escape-game',
    category: 'Demodern',
    type: 'professional',
  },
  {
    id: 7,
    title: 'Portfolio website',
    description: 'Migros escape game landingpage to promote the escape game.',
    technologies: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'ZUSTAND', 'MOTION'],
    achievements: [
      'Shipped landingpage for Migros 2025 escape game.',
      'Implemented a responsive design for the platform.',
    ],
    link: 'https://demodern.de/projekte/migros-digital-escape-game',
    category: 'Personal',
    type: 'personal',
  },
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
