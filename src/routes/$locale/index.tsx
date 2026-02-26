import { createFileRoute, Link } from '@tanstack/react-router';
import clsx from 'clsx';
import {
  ProjectCard,
} from '../../components/ProjectCard';
import { groupToCardItem, projectToCardItem } from '../../components/projectCardItems';
import { ScrollReveal } from '../../components/ScrollReveal';
import { StackSection } from '../../components/StackSection';
import { getProfile } from '../../data/profile';
import { getDefaultSeoMeta } from '../../data/seo';
import { getLocalizedProject, getLocalizedProjectGroup } from '../../data/projects.i18n';
import { getLocalizedStack } from '../../data/stack.i18n';
import { normalizeLocale } from '../../i18n';
import { useMessages } from '../../i18n/useMessages';
import styles from '../index.module.scss';

import { getProjects, getProjectGroups, getStack } from '../../server/functions';
import type { Project, ProjectGroup } from '../../data/projects';
const cdnUrl = import.meta.env.VITE_CDN_URL ?? '';

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
    .filter(
    (g: ProjectGroup) => g.highlighted,
    )
    .map((g: ProjectGroup) => getLocalizedProjectGroup(g, currentLocale));

  const professionalProjects = highlightedProjects.filter(
    (p: Project) => p.type === 'professional',
  );
  const personalProjects = highlightedProjects.filter(
    (p: Project) => p.type === 'personal',
  );
  const professionalGroups = highlightedGroups.filter(
    (g: ProjectGroup) => g.type === 'professional',
  );
  const personalGroups = highlightedGroups.filter(
    (g: ProjectGroup) => g.type === 'personal',
  );

  return (
    <>
      <section className={clsx(styles.hero)} aria-label="Introduction">
        <div className={clsx(styles.heroBackground)} aria-hidden>
          <img
            src={`${cdnUrl}/Images/aza-hero.png`}
            alt=""
            className={clsx(styles.heroImage)}
            width={1920}
            height={1080}
            fetchPriority="high"
          />
        </div>
        <div className={clsx(styles.heroOverlay)} aria-hidden />
        <div className={clsx(styles.heroContent)}>
          <p className={clsx(styles.eyebrow)}>{profile.tagline}</p>
          <h1 className={clsx(styles.title)}>{profile.headline}</h1>
          <p className={clsx(styles.subtitle)}>
            {t.home.subtitle}
          </p>
          <div className={clsx(styles.heroActions)}>
            <Link
              to="/$locale/projects"
              params={{ locale }}
              className={clsx(styles.heroBtnPrimary)}
            >
              {t.home.viewWork}
            </Link>
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className={clsx(styles.heroBtnSecondary)}
            >
              {t.home.getInTouch}
            </Link>
          </div>
        </div>
      </section>

      <div className={clsx(styles.page)}>
        <StackSection techCategories={localizedTechCategories} />

        <ScrollReveal
          className={clsx(styles.revealBlock)}
          visibleClass={styles.revealBlockVisible}
        >
          <section aria-labelledby="work-heading">
            <header className={clsx(styles.workHeader)}>
              <p className={clsx(styles.workEyebrow)}>{t.home.portfolioEyebrow}</p>
              <h2 id="work-heading" className={clsx(styles.workTitle)}>
                {t.home.selectedWork}
              </h2>
              <p className={clsx(styles.workSubtitle)}>
                {t.home.workSubtitle}
              </p>
            </header>

            {(professionalProjects.length > 0 ||
              professionalGroups.length > 0) && (
              <section className={clsx(styles.projectGroup)}>
                <h3 className={clsx(styles.groupTitle)}>{t.home.professional}</h3>
                <div className={clsx(styles.grid)}>
                  {professionalProjects.map((project: Project) => (
                    <ProjectCard
                      key={project.id}
                      item={projectToCardItem(project)}
                      to="/$locale/projects/$projectSlug"
                      params={{ locale, projectSlug: project.slug }}
                    />
                  ))}
                  {professionalGroups.map((group: ProjectGroup) => (
                    <ProjectCard
                      key={`group-${group.id}`}
                      item={groupToCardItem(group, {
                        collectionLabel: t.projects.collection,
                        projectsLabel: t.projects.projectsList.toLowerCase(),
                      })}
                      to="/$locale/projects/group/$groupSlug"
                      params={{ locale, groupSlug: group.slug }}
                    />
                  ))}
                </div>
              </section>
            )}

            {(personalProjects.length > 0 || personalGroups.length > 0) && (
              <section className={clsx(styles.projectGroup)}>
                <h3 className={clsx(styles.groupTitle)}>{t.home.personal}</h3>
                <div className={clsx(styles.grid)}>
                  {personalProjects.map((project: Project) => (
                    <ProjectCard
                      key={project.id}
                      item={projectToCardItem(project)}
                      to="/$locale/projects/$projectSlug"
                      params={{ locale, projectSlug: project.slug }}
                    />
                  ))}
                  {personalGroups.map((group: ProjectGroup) => (
                    <ProjectCard
                      key={`group-${group.id}`}
                      item={groupToCardItem(group, {
                        collectionLabel: t.projects.collection,
                        projectsLabel: t.projects.projectsList.toLowerCase(),
                      })}
                      to="/$locale/projects/group/$groupSlug"
                      params={{ locale, groupSlug: group.slug }}
                    />
                  ))}
                </div>
              </section>
            )}
          </section>
        </ScrollReveal>

        <section className={clsx(styles.cta)}>
          <div className={clsx(styles.ctaContent)}>
            <h2 className={clsx(styles.ctaTitle)}>{t.home.ctaTitle}</h2>
            <p className={clsx(styles.ctaText)}>
              Based in {profile.location}. {t.home.ctaText}
            </p>
          </div>
          <div className={clsx(styles.ctaActions)}>
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className={clsx(styles.ctaPrimary)}
            >
              {t.home.getInTouch}
            </Link>
            <Link
              to="/$locale/projects"
              params={{ locale }}
              className={clsx(styles.ctaSecondary)}
            >
              {t.home.viewAllProjects}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

