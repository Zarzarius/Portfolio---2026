export type ProjectType = 'professional' | 'personal';

export const categories = ['Demodern', 'Dart Design', 'Personal'] as const;
export type Category = (typeof categories)[number];

export interface Project {
  id: number;
  /** URL segment for routing (e.g. /projects/wwf-germany-ar) */
  slug: string;
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
  /** Optional small thumbnail image URL (displayed small, icon-sized). */
  image?: string;
  imageAlt?: string;
  /** Optional icon (emoji or character) when no image—shown in small media cell. */
  icon?: string;
}

/** Collection of minor projects that share common technologies. */
export interface ProjectGroup {
  id: number;
  /** URL segment for routing (e.g. /projects/group/personal-projects) */
  slug: string;
  title: string;
  description?: string;
  technologies: string[];
  items: ProjectGroupItem[];
  category: Category;
  type: ProjectType;
  achievements?: string[];
  /** When true, group is shown on the home page "Selected work" section */
  highlighted?: boolean;
  /** Optional card image path (e.g. Projects/8.png); resolved with CDN URL in UI */
  image?: string;
  imageAlt?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'wwf-ar',
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
    award: 'Lovie Awards Bronze for “Best use of Augmented Reality”',
    achievements: [
      'Shipped WebAR experience with no native app; users access AR from the mobile browser, increasing reach and avoiding app-store friction.',
      'Delivered multiplatform experience: AR on mobile and 3D viewer on desktop using a single codebase with model-viewer.',
      'Integrated GIS-based data visualisation to show real animal habitats within the experience.',
      'Shipped high-fidelity, animated 3D animals (lynx, wolf, European bison, elk) optimised for real-time rendering on mobile browsers.',
      'Implemented interactive hotspots on 3D models to surface educational content and scientific data at 1:1 scale.',
    ],
    link: 'https://www.wwf.de/aktiv-werden/augmented-reality/',
    image: 'Projects/wwf-ar.png',
    category: 'Demodern',
    type: 'professional',
    highlighted: true,
  },
  {
    id: 2,
    slug: 'sap-ar',
    title: 'SAP S/4HANA Cloud AR Hybrid Event Showcase',
    description:
      'A global hybrid event solution that uses AR to visualise SAP’s S/4HANA Cloud business processes, transforming abstract data into an interactive "business muscle" metaphor.',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'REACT THREE FIBER',
      'WEBGL',
      '8TH WALL',
      'LOTTIE FILES',
      'GSAP',
    ],
    achievements: [
      'Delivered hybrid event solution that uses AR to visualise SAP’s S/4HANA Cloud business processes, transforming abstract data into an interactive "business muscle" metaphor.',
      'Shipped high-fidelity, animated 3D business processes (SAP’s S/4HANA Cloud business processes) optimised for real-time rendering on mobile browsers.',
      'Delivered multiplatform experience: AR on mobile and 3D viewer on desktop using a single codebase with React Three Fiber and 8th Wall.',
      'Implemented complex UI interactions with React Three Fiber and Three.js to create an immersive and interactive experience.',
    ],
    link: 'https://demodern.de/projekte/sap-ar-hybrid-event-showcase',
    image: 'Projects/sap-ar.png',
    category: 'Demodern',
    type: 'professional',
    highlighted: true,
  },
  {
    id: 3,
    slug: 'soundbooth',
    title: 'Snipes Soundbooth - Landing page & on-site installation',
    description:
      'Web app and landing page for Snipes Soundbooth: users create and share audio clips. Built with React and Strapi; includes on-site installation support for the physical Soundbooth.',
    technologies: ['REACT', 'TYPESCRIPT', 'ZUSTAND', 'STRAPI'],
    achievements: [
      'Developed a responsive web application for Snipes Soundbooth using React and TypeScript.',
      'Integrated the Snipes API to fetch the audio clips.',
      'Implemented a responsive design for the Soundbooth.',
      'Delivered on-site installation and maintenance of the Soundbooth.',
    ],
    link: 'https://demodern.com/projects/snipes-soundbooth',
    image: 'Projects/soundbooth.png',
    category: 'Demodern',
    type: 'professional',
    highlighted: true,
  },
  {
    id: 4,
    slug: 'miniverse',
    title: 'Miniverse - Digital Metaverse Gamified Platform',
    description:
      'Digital metaverse for Mini: gamified 3D world where users explore and interact in real time. Built with React Three Fiber and WebSockets for live multiplayer.',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'ZUSTAND',
      'GSAP',
      'REACT THREE FIBER',
      'WEBSOCKETS',
    ],
    award: 'FWA Site of the Day',
    type: 'professional',
    achievements: [
      'Shipped digital metaverse gamified platform for Mini that allows users to explore a virtual world and interact with other users.',
      'Implemented WebSocket networking for real-time multiplayer.',
      'Implemented a responsive design for the platform.',
      'Shipped ongoing features and improvements for the platform.',
    ],
    link: 'https://demodern.com/projects/miniverse',
    image: 'Projects/miniverse.png',
    category: 'Demodern',
  },
  {
    id: 5,
    slug: 'metaverse',
    title: 'Virtual experience metaverse - Metaverse platform for brands',
    description:
      'Brand-focused metaverse platform: virtual spaces for product showcase and user interaction. React Three Fiber for 3D; WebSockets and live chat for real-time social features.',
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
      'Implemented WebSocket networking for real-time experience.',
      'Shipped new features including sound effects and platform improvements.',
    ],
    link: 'https://demodern.de/services/corporate-metaverse-cases-ve',
    image: 'Projects/metaverse.png',
    category: 'Demodern',
  },
  {
    id: 6,
    slug: 'migros-escape',
    title: 'Migros Digital Escape Game landing page',
    description:
      'Migros Digital Escape Game landing page to promote the escape game.',
    technologies: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'ZUSTAND', 'MOTION'],
    achievements: [
      'Shipped landing page for Migros 2025 escape game.',
      'Implemented a responsive design for the platform.',
    ],
    link: 'https://demodern.de/projekte/migros-digital-escape-game',
    image: 'Projects/migros-escape.png',
    category: 'Demodern',
    type: 'professional',
  },
  {
    id: 7,
    slug: 'portfolio',
    title: 'Portfolio website',
    description:
      'Personal portfolio and contact hub built with a modern, type-safe stack. Features a project showcase with server-driven data, a contact form with validated submissions and Resend-powered email delivery, and responsive layout with SCSS. Engineered for peak Lighthouse ratios and strong organic discoverability: tight Core Web Vitals, semantic document structure, and complete SEO metadata.',
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
      'Sustained maximal Lighthouse ratios—100 Performance, Accessibility, Best Practices, and SEO—via lean bundles, critical-path prioritisation, and CLS-safe layout.',
      'Hardened SEO ranking signals: canonical URLs, hreflang, Open Graph / Twitter cards, and JSON-LD for crawlable entity markup.',
      'Built full-stack portfolio with TanStack Start: file-based routing, server loaders, and type-safe data fetching for the project list.',
      'Implemented contact form with Zod validation and Resend integration for reliable email delivery.',
    ],
    image: 'Projects/portfolio.png',
    category: 'Personal',
    type: 'personal',
  },
  {
    id: 8,
    slug: 'job-application-tracker',
    title: 'Job application tracker',
    image: 'Projects/job-application-tracker.png',
    link: 'https://awesome-asteroid-three.vercel.app',
    highlighted: true,
    description:
      'Astro and React app to add and track job offers—form capture, status list, and PDF export—with Supabase persistence. Ship-oriented architecture: islands hydration, minimal JS payload, and Lighthouse-friendly static shells for near-instant first paint.',
    technologies: ['ASTRO', 'REACT', 'TYPESCRIPT', 'SUPABASE'],
    achievements: [
      'Hit maximal Lighthouse category scores (100 across Performance, Accessibility, Best Practices, SEO) with Astro islands and deferred client hydration.',
      'Built form to add and track job applications with status and notes; PDF export for summaries.',
      'Persisted data in Supabase for sync across devices without bloating the critical rendering path.',
    ],
    category: 'Personal',
    type: 'personal',
  },
  {
    id: 9,
    slug: 'adestra',
    title: 'Adestra - Movement & health studio',
    image: 'Projects/adestra.jpg',
    imageAlt: 'Adestra homepage, a training session in the studio',
    link: 'https://adestra-three.vercel.app',
    highlighted: true,
    description:
      'Bilingual site (Spanish and Galician) for Adestra Movemento e saúde, a movement and health studio in O Rosal, Galicia. Next.js and Sanity with seed content fallback, locale-aware metadata, and a studio signup flow—tuned for perfect Lighthouse audits and local-search SEO.',
    technologies: ['NEXT.JS', 'TYPESCRIPT', 'SANITY'],
    achievements: [
      'Delivered 100/100 Lighthouse ratios (Performance, Accessibility, Best Practices, SEO) with server-rendered pages, image optimisation, and stable layout metrics (LCP / CLS / INP).',
      'Strengthened SEO ranking for bilingual local discovery: locale metadata, semantic headings, and crawlable CMS-driven copy.',
      'Sanity CMS with seed fallback, studio signup flow, and on-demand revalidation so content stays fresh without sacrificing audit scores.',
    ],
    category: 'Personal',
    type: 'personal',
  },
  {
    id: 10,
    slug: 'pulsative',
    title: 'PULSATIVE - Official band website',
    image: 'Projects/pulsative.jpg',
    imageAlt: 'PULSATIVE homepage with the band lineup',
    link: 'https://pulsative.band',
    highlighted: true,
    description:
      'Official site for the band PULSATIVE. Bilingual German and English Astro + Sanity site: showreel, tour dates, videos, live photos, bio, booking, and press kit—content-heavy media with maximal Lighthouse ratios and search-ready metadata.',
    technologies: ['ASTRO', 'TYPESCRIPT', 'SANITY', 'GSAP'],
    achievements: [
      'Achieved maximal Lighthouse scores (100 Performance, Accessibility, Best Practices, SEO) despite media-rich pages via static generation and progressive enhancement.',
      'SEO-ready bilingual structure (DE/EN): structured headings, shareable OG tags, and indexable tour / bio content for organic discovery.',
      'Sanity-backed content with mock fallback; GSAP motion kept off the critical path so Core Web Vitals stay green.',
    ],
    category: 'Personal',
    type: 'personal',
  },
  {
    id: 11,
    slug: 'a-jalleira',
    title: 'A Jalleira - Forest education association',
    image: 'Projects/a-jalleira.jpg',
    imageAlt: 'A Jalleira homepage over a forest canopy',
    link: 'https://a-jalleira.vercel.app',
    highlighted: true,
    description:
      'Official site for A Jalleira, a non-profit forest and environmental education association in the Baixo Miño, Galicia. Next.js and Sanity across Galician, Spanish, English, and Portuguese—multilingual SEO hygiene and perfect Lighthouse category scores as first-class goals.',
    technologies: ['NEXT.JS', 'TYPESCRIPT', 'SANITY'],
    achievements: [
      'Locked in maximal Lighthouse ratios—100 across Performance, Accessibility, Best Practices, and SEO—with SSR/ISR delivery and accessible, semantic markup.',
      'Four locales (gl / es / en / pt) with Galician fallback, hreflang-aligned metadata, and CMS-owned SEO fields for stronger organic ranking.',
      'Sanity as the source of truth for pages, activities, navigation, and SEO without regressing Core Web Vitals.',
    ],
    category: 'Personal',
    type: 'personal',
  },
];

export const projectGroups: ProjectGroup[] = [
  {
    id: 1,
    slug: 'campaign-pages',
    title: 'Demodern Campaign landing pages',
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
      'STRAPI',
      'STYLED COMPONENTS',
    ],
    image: 'Projects/campaign-pages.png',
    achievements: [
      'Delivered multiple campaign landing pages with React and shared tooling for clear conversion goals and fast load times.',
      'Implemented strong visual hierarchy, brand storytelling, and campaign messaging aligned with client outcomes.',
      'Used Motion, GSAP, and Lottie for engaging animations; React Three Fiber and Strapi where required.',
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
    slug: 'dart-corporate',
    title: "D'Art Design Group corporate landing pages",
    description:
      "Corporate landing pages for D'Art Design Group clients, built with Next.js, Craft CMS, GraphQL, and shared front-end tooling (Motion, GSAP, Lottie, SASS).",
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
    achievements: [
      "Built and shipped multiple corporate landing pages for D'Art Design Group clients using Next.js and shared stack.",
      'Integrated Craft CMS and GraphQL for content-driven pages with type-safe data and Zod validation.',
      'Delivered responsive, animated experiences with Motion, GSAP, and Lottie; SASS for consistent styling.',
    ],
    image: 'Projects/dart-corporate.png',
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
        title: 'Stiftung Paulinenhilfe corporate landing page',
        description:
          'Landing page for Stiftung Paulinenhilfe to show their services.',
        link: 'https://d-art-digital.de/de/projects/stiftung-paulinenhilfe',
      },
      {
        id: 'corporative-lp-3',
        title: 'Medienvorsorge.de landing page',
        description:
          'Landing page for Medienvorsorge.de to show their services.',
        link: 'https://d-art-digital.de/de/projects/medienvorsorge',
      },
      {
        id: 'corporative-lp-4',
        title: 'Hanselmann & Compagnie corporate landing page',
        description:
          'Landing page for Hanselmann & Compagnie to show their services.',
        link: 'https://d-art-digital.de/de/projects/hanselmann-compagnie',
      },
      {
        id: 'corporative-lp-5',
        title: 'Düsseldorf Airport Quiz game',
        description:
          'Quiz game for Düsseldorf Airport to show their services and the city of Düsseldorf in a gamified way.',
        link: 'https://d-art-digital.de/de/projects/dus-quiz',
      },
    ],
    category: 'Dart Design',
    type: 'professional',
  },
  {
    id: 3,
    slug: 'personal',
    title: 'Personal projects',
    technologies: [
      'ASTRO',
      'NEXT.JS',
      'SANITY',
      'SUPABASE',
      'TYPESCRIPT',
      'ZOD',
      'SASS',
      'STYLED COMPONENTS',
    ],
    highlighted: true,
    description:
      'Personal sites and apps across Astro, Next.js, Sanity, and Supabase—consistently shipping maximal Lighthouse ratios (100 Performance, Accessibility, Best Practices, SEO) and search-engine-ready information architecture for local businesses, creatives, and content-led brands.',
    achievements: [
      'Consistently delivered perfect Lighthouse audits—100/100 across Performance, Accessibility, Best Practices, and SEO—via static-first rendering, lean hydration, and CLS-safe layouts.',
      'Elevated organic SEO ranking with semantic HTML, structured metadata (canonical, OG, Twitter), multilingual hreflang where needed, and CMS-editable SEO fields.',
      'Optimised Core Web Vitals (LCP, CLS, INP) with image discipline, critical-path budgeting, and progressive enhancement for media-heavy pages.',
      'Shipped TypeScript-backed, content-driven architectures (Sanity / Supabase) that stay crawlable, accessible, and maintainable under real content churn.',
    ],
    items: [
      {
        id: 'personal-1',
        title: 'El Maizter - Foodtruck website',
        description:
          'Menu and location hub for a street food truck—Lighthouse 100s and local-SEO-friendly structure so customers find the truck and browse offerings fast.',
        link: 'https://el-maizter.vercel.app',
      },
      {
        id: 'personal-2',
        title: 'La Cabana - Restaurant website',
        description:
          'Restaurant site with atmosphere, hours, and contact—engineered for peak Lighthouse scores and discoverable local search signals.',
        link: 'https://la-cabana-web.vercel.app/',
      },
      {
        id: 'personal-3',
        title: 'ASP - Freelance craftsman website',
        description:
          'Trades portfolio and quote CTA—static-first delivery with maximal Lighthouse ratios and clear SEO hierarchy for client acquisition.',
        link: 'https://asp-woad.vercel.app/',
      },
      {
        id: 'personal-4',
        title: 'Antonio F. Rando Casermeiro - Portfolio website',
        description:
          'Next.js + Sanity portfolio for a writer, teacher, and Doctor in History—Server Components, accessible IA, and SEO metadata tuned for indexable essays, research, and multimedia.',
        link: 'https://portfolio-antonio-rando.vercel.app/',
      },
      {
        id: 'personal-5',
        title: 'Beer Tab',
        description:
          'Astro + Supabase bar-tab app (customer flow + manager dashboard)—islands architecture keeping Lighthouse Performance at the ceiling while syncing live tab data.',
        link: 'https://beer-counter-sandy.vercel.app/',
      },
      {
        id: 'personal-6',
        title: 'Portfolio Pam',
        description:
          'Creative portfolio on Next.js + Sanity: Studio-editable copy, SEO, and projects; Server Components + view transitions; Lighthouse-perfect delivery for home, case studies, and contact.',
        link: 'https://portfolio-pam-roan.vercel.app/',
      },
    ],
    image: 'Projects/personal.png',
    category: 'Personal',
    type: 'personal',
  },
  {
    id: 4,
    slug: 'dart-3d',
    title: "D'Art Design – 3D product showcase & concept cases",
    description:
      "3D applications for D'Art Design clients: 3D worlds that visualise a company’s products and flows, interactive 3D hubs for exploring services, photorealistic product showcases for pitches, and internal tools such as a model configurator for artists to test shaders and assets in the browser. Used in trade shows, events, and as concept presentations.",
    technologies: [
      'NEXT.JS',
      'TYPESCRIPT',
      'REACT THREE FIBER',
      'THREE.JS',
      'WEBGL',
      'MOTION',
      'GSAP',
      'LOTTIE FILES',
      'ZUSTAND',
      'CRAFT CMS',
      'GRAPHQL',
      'ZOD',
      'SASS',
    ],
    achievements: [
      "Delivered 3D applications for D'Art Design clients: isometric product worlds, interactive service hubs, and photorealistic product showcases for trade shows, events, and pitches.",
      'Worked closely with 3D artists—testing implementations, shaders, and materials in the browser so rendering matches the 3D editor and artists can align with devs across projects.',
      'Built internal tools such as a model 3D configurator so artists can validate assets and lighting in WebGL before integration.',
    ],
    items: [
      {
        id: 'dart-3d-1',
        title: 'SMA. – 3D green energy experience',
        description:
          'Isometric, simplified 3D world for SMA (green energy brand) with product showcase and interactive 3D models, showing their product range and how energy is accumulated in one green-energy network. Used in trade shows and events.',
        icon: '☀️',
        link: 'https://d-art-digital.de/de/projects/sma-grid-stability',
      },
      {
        id: 'dart-3d-2',
        title: 'Düsseldorf Airport 3D experience',
        description:
          '3D experience with a simplified 3D model of the airport for Düsseldorf Airport to show their services and a hub for users to explore the airport and its offerings. Used in trade shows and events.',
        icon: '✈️',
      },
      {
        id: 'dart-3d-3',
        title: 'GROHE – 3D product showcase (pitch)',
        description:
          'Concept for GROHE: 3D product model with high-resolution, realistic textures—Kronos materials and advanced shaders for photorealistic renders in the browser.',
        icon: '🚿',
      },
      {
        id: 'dart-3d-4',
        title: 'Model 3D configurator',
        description:
          'Concept for 3D artists to test shaders and 3D assets in the browser, so rendering matches the 3D editor in WebGL with a panel to configure the 3D model, lighting maps. Gives artists a straightforward way to test and align with devs across different projects.',
        icon: '⚙️',
      },
    ],
    image: 'Projects/dart-3d.png',
    category: 'Dart Design',
    type: 'professional',
  },
];
