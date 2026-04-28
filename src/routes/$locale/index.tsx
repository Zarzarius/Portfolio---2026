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
import { normalizeLocale } from '@/i18n';
import { useMessages } from '@/i18n/useMessages';
import styles from '../index.module.scss';
import { getProjects, getProjectGroups, getStack } from '@/server/functions';
import type { Project, ProjectGroup } from '@/data/projects';

const cx = classNames.bind(styles);
const cdnUrl = import.meta.env.VITE_CDN_URL ?? '';
let heroAnimationShown = false;

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
    const seo = getDefaultSeoMeta({
      locale: params.locale,
      path: `/${params.locale}`,
      pathnameWithoutLocale: '/',
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

  // Split headline into parts for styling if needed, or just use as is
  const headlineParts = profile.headline.split(' ');
  const lastWord = headlineParts.pop();
  const mainHeadline = headlineParts.join(' ');

  return (
    <>
      <section
        className={cx('hero', !shouldAnimate && 'heroNoAnimation')}
        aria-label="Introduction"
      >
        <div ref={heroBackgroundRef} className={cx('heroBackground')} aria-hidden>
          <img
            src={`${cdnUrl}/Images/aza-hero.png`}
            alt=""
            className={cx('heroImage')}
            width={1600}
            height={1200}
            fetchPriority="high"
          />
        </div>
        <div className={cx('heroOverlay')} aria-hidden />
        <div className={cx('heroContent')}>
          <p className={cx('eyebrow')}>{profile.tagline}</p>
          <h1 className={cx('title')}>
            {mainHeadline} <span>{lastWord}</span>
          </h1>
          <p className={cx('subtitle')}>{t.home.subtitle}</p>
          <div className={cx('heroActions')}>
            <Link
              to="/$locale/projects"
              params={{ locale }}
              className={cx('heroBtnPrimary')}
            >
              {t.home.viewWork}
            </Link>
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className={cx('heroBtnSecondary')}
            >
              {t.home.getInTouch}
            </Link>
          </div>
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
