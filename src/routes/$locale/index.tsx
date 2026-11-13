import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { useMagnetic } from '@/hooks/useMagnetic';
import { ProjectSections } from '@/components/ProjectSections';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StackSection } from '@/components/StackSection';
import { getProfile } from '@/data/profile';
import { getDefaultSeoMeta } from '@/data/seo';
import {
  getLocalizedProject,
  getLocalizedProjectGroup,
} from '@/data/projects.i18n';
import { getLocalizedStack } from '@/data/stack.i18n';
import { getMessages, normalizeLocale } from '@/i18n';
import { useMessages } from '@/i18n/useMessages';
import styles from '../index.module.scss';
import { getProjects, getProjectGroups, getStack } from '@/server/functions';
import type { Project, ProjectGroup } from '@/data/projects';

const cx = classNames.bind(styles);
let heroAnimationShown = false;

const heroStack = [
  { name: 'React', icon: 'react', tone: 'toneReact' },
  { name: 'TypeScript', icon: 'typescript', tone: 'toneTs' },
  { name: 'Next.js', icon: 'next', tone: 'toneNext' },
  { name: 'R3F', icon: 'three', tone: 'toneR3f' },
  { name: 'Node.js', icon: 'node', tone: 'toneNode' },
  { name: 'Docker', icon: 'docker', tone: 'toneDocker' },
  { name: 'Figma', icon: 'figma', tone: 'toneFigma' },
  { name: 'Cursor', icon: 'cursor', tone: 'toneCursor' },
] as const;

type TechIconName = (typeof heroStack)[number]['icon'];

const techIconPaths: Record<TechIconName, string> = {
  react:
    'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z',
  typescript:
    'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z',
  next: 'M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z',
  three:
    'M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z',
  node: 'M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z',
  docker:
    'M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z',
  figma:
    'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z',
  cursor:
    'M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23',
};

function TechIcon({ name }: { name: TechIconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={techIconPaths[name]} />
    </svg>
  );
}

type FactIconName = 'pin' | 'role' | 'time' | 'layers';

function FactIcon({ name }: { name: FactIconName }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'pin':
      return (
        <svg {...props}>
          <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.25" />
        </svg>
      );
    case 'role':
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      );
    case 'time':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...props}>
          <path d="m12 3 9 5-9 5-9-5 9-5z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 17 9 5 9-5" />
        </svg>
      );
    default: {
      const unreachable: never = name;
      return unreachable;
    }
  }
}

export const Route = createFileRoute('/$locale/')({
  loader: async () => {
    const [projects, projectGroups, techCategories] = await Promise.all([
      getProjects(),
      getProjectGroups(),
      getStack(),
    ]);
    return { projects, projectGroups, techCategories };
  },
  head: ({ params }) => {
    const locale = normalizeLocale(params.locale);
    const t = getMessages(locale);
    const seo = getDefaultSeoMeta({
      locale,
      path: `/${locale}`,
      pathnameWithoutLocale: '/',
      title: t.seo.homeTitle,
      description: t.seo.homeDescription,
      kind: 'home',
    });
    return { meta: seo.meta, links: seo.links, scripts: seo.scripts };
  },
  component: Home,
});

function Home() {
  const { projects, projectGroups, techCategories } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const currentLocale = normalizeLocale(locale);
  const t = useMessages();
  const profile = getProfile(currentLocale);
  const localizedTechCategories = getLocalizedStack(
    techCategories,
    currentLocale,
  );
  const highlightedProjects = projects
    .filter((p: Project) => p.highlighted)
    .map((p: Project) => getLocalizedProject(p, currentLocale));
  const highlightedGroups = projectGroups
    .filter((g: ProjectGroup) => g.highlighted)
    .map((g: ProjectGroup) => getLocalizedProjectGroup(g, currentLocale));
  const heroBackgroundRef = useRef<HTMLDivElement>(null);
  const heroPrimaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.32, maxDistance: 10 });
  const heroSecondaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.25, maxDistance: 8 });
  const ctaPrimaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.32, maxDistance: 10 });
  const ctaSecondaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.25, maxDistance: 8 });

  const shouldAnimate = !heroAnimationShown;
  useEffect(() => {
    if (shouldAnimate) heroAnimationShown = true;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    if (prefersReducedMotion.matches) return;

    let animationFrame = 0;

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        const heroBg = heroBackgroundRef.current;
        if (heroBg) {
          heroBg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
        }
        animationFrame = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [shouldAnimate]);

  const facts: { icon: FactIconName; text: string }[] = [
    { icon: 'pin', text: profile.location },
    { icon: 'role', text: profile.tagline },
    { icon: 'time', text: t.home.years },
    { icon: 'layers', text: t.home.focus },
  ];

  return (
    <>
      <section
        className={cx('hero', !shouldAnimate && 'heroNoAnimation')}
        aria-label="Introduction"
      >
        <div ref={heroBackgroundRef} className={cx('heroBackground')} aria-hidden>
          <picture>
            <source
              media="(max-width: 768px)"
              type="image/avif"
              srcSet="/aza-hero-mobile.avif"
            />
            <source type="image/avif" srcSet="/aza-hero.avif" />
            <source media="(max-width: 768px)" srcSet="/aza-hero-mobile.jpg" />
            <img
              src="/aza-hero.jpg"
              alt={t.home.heroImageAlt}
              className={cx('heroImage')}
              width={1024}
              height={576}
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className={cx('heroOverlay')} aria-hidden />
        <div className={cx('heroContent')}>
          <div className={cx('heroMain')}>
            <div className={cx('heroCopy')} data-stagger>
              <p className={cx('eyebrow')}>
                <span className={cx('eyebrowMark')} aria-hidden />
                {profile.tagline}
              </p>
              <h1 className={cx('title')}>
                {t.home.heroLead}{' '}
                <span className={cx('accent')}>{t.home.heroAccent}</span>
              </h1>
              <p className={cx('subtitle')}>{t.home.subtitle}</p>
              <div className={cx('heroActions')}>
                <Link
                  ref={heroPrimaryRef}
                  to="/$locale/projects"
                  params={{ locale }}
                  className={cx('heroBtnPrimary')}
                >
                  {t.home.viewWork}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </Link>
                <Link
                  ref={heroSecondaryRef}
                  to="/$locale/about"
                  params={{ locale }}
                  className={cx('heroBtnSecondary')}
                >
                  {t.nav.about}
                </Link>
              </div>
            </div>
            <ul
              className={cx('heroFacts')}
              aria-label={t.home.factsLabel}
              data-stagger
            >
              {facts.map((fact) => (
                <li key={fact.icon} className={cx('heroFact')}>
                  <span className={cx('heroFactIcon')}>
                    <FactIcon name={fact.icon} />
                  </span>
                  {fact.text}
                </li>
              ))}
            </ul>
          </div>
          <ul
            className={cx('heroStack')}
            aria-label={t.stack.title}
            data-stagger
          >
            {heroStack.map((item) => (
              <li key={item.name} className={cx('heroStackItem')}>
                <span className={cx('heroStackMark', item.tone)}>
                  <TechIcon name={item.icon} />
                </span>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className={cx('page')}>
        <StackSection techCategories={localizedTechCategories} />

        <ScrollReveal
          className={cx('revealBlock')}
          visibleClass={cx('revealBlockVisible')}
        >
          <section aria-labelledby="work-heading">
            <header className={cx('workHeader')}>
              <p className={cx('workEyebrow')}>{t.home.portfolioEyebrow}</p>
              <h2 id="work-heading" className={cx('workTitle')}>
                {t.home.selectedWork}
              </h2>
              <p className={cx('workSubtitle')}>{t.home.workSubtitle}</p>
            </header>

            <ProjectSections
              projects={highlightedProjects}
              groups={highlightedGroups}
              locale={locale}
              professionalLabel={t.home.professional}
              personalLabel={t.home.personal}
              collectionLabel={t.projects.collection}
              projectsLabel={t.projects.projectsList.toLowerCase()}
              headingLevel={3}
              classNames={{
                projectGroup: cx('projectGroup'),
                groupTitle: cx('groupTitle'),
                grid: cx('grid'),
              }}
            />
          </section>
        </ScrollReveal>

        <section className={cx('cta')} data-reveal>
          <div className={cx('ctaContent')}>
            <h2 className={cx('ctaTitle')}>{t.home.ctaTitle}</h2>
            <p className={cx('ctaText')}>
              {t.common.basedIn} {profile.location}. {t.home.ctaText}
            </p>
          </div>
          <div className={cx('ctaActions')}>
            <Link
              ref={ctaPrimaryRef}
              to="/$locale/contact"
              params={{ locale }}
              className={cx('ctaPrimary')}
            >
              {t.home.getInTouch}
            </Link>
            <Link
              ref={ctaSecondaryRef}
              to="/$locale/projects"
              params={{ locale }}
              className={cx('ctaSecondary')}
            >
              {t.home.viewAllProjects}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
