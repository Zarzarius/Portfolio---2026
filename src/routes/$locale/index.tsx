import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
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
  { name: 'React', mark: 'Re', tone: 'toneReact' },
  { name: 'TypeScript', mark: 'TS', tone: 'toneTs' },
  { name: 'Next.js', mark: 'N', tone: 'toneNext' },
  { name: 'R3F', mark: 'R3F', tone: 'toneR3f' },
  { name: 'Node.js', mark: 'JS', tone: 'toneNode' },
  { name: 'Docker', mark: 'D', tone: 'toneDocker' },
] as const;

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
          <img
            src="/aza-hero.jpg"
            alt=""
            className={cx('heroImage')}
            width={1024}
            height={576}
            fetchPriority="high"
          />
        </div>
        <div className={cx('heroOverlay')} aria-hidden />
        <div className={cx('heroContent')}>
          <div className={cx('heroMain')}>
            <div className={cx('heroCopy')}>
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
                  to="/$locale/about"
                  params={{ locale }}
                  className={cx('heroBtnSecondary')}
                >
                  {t.nav.about}
                </Link>
              </div>
            </div>
            <ul className={cx('heroFacts')} aria-label={t.home.factsLabel}>
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
          <ul className={cx('heroStack')} aria-label={t.stack.title}>
            {heroStack.map((item) => (
              <li key={item.name} className={cx('heroStackItem')}>
                <span className={cx('heroStackMark', item.tone)}>{item.mark}</span>
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

        <section className={cx('cta')}>
          <div className={cx('ctaContent')}>
            <h2 className={cx('ctaTitle')}>{t.home.ctaTitle}</h2>
            <p className={cx('ctaText')}>
              {t.common.basedIn} {profile.location}. {t.home.ctaText}
            </p>
          </div>
          <div className={cx('ctaActions')}>
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className={cx('ctaPrimary')}
            >
              {t.home.getInTouch}
            </Link>
            <Link
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
