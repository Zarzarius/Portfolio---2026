import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/Button';
import {
  ProjectCard,
} from '@/components/ProjectCard';
import {
  groupToCardItem,
  projectToCardItem,
} from '@/components/projectCardItems';
import styles from '../../projects/projects.module.scss';
import {
  getProjects,
  getProjectGroups,
  getCategories,
} from '@/server/functions';
import { getDefaultSeoMeta } from '@/data/seo';
import type { Project, ProjectGroup } from '@/data/projects';
import { getLocalizedProject, getLocalizedProjectGroup } from '@/data/projects.i18n';
import { normalizeLocale } from '@/i18n';
import { useMessages } from '@/i18n/useMessages';

const ALL_CATEGORIES_KEY = 'ALL';

const CATEGORY_LABELS: Record<string, string> = {
  [ALL_CATEGORIES_KEY]: 'All',
  Demodern: 'Demodern',
  'Dart Design': "D'Art Design",
  Personal: 'Personal',
};

export const Route = createFileRoute('/$locale/projects')({
  loader: async () => {
    const [projects, projectGroups, categories] = await Promise.all([
      getProjects(),
      getProjectGroups(),
      getCategories(),
    ]);
    return { projects, projectGroups, categories };
  },
  head: ({ params }) => {
    const seo = getDefaultSeoMeta({
      locale: params.locale,
      path: `/${params.locale}/projects`,
      pathnameWithoutLocale: '/projects',
    });
    return { meta: seo.meta, links: seo.links, scripts: seo.scripts };
  },
  component: ProjectsLayout,
});

function ProjectsLayout() {
  const { projects, projectGroups, categories } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const t = useMessages();
  const location = useLocation();
  const isListPage = location.pathname === `/${locale}/projects`;
  const [activeFilter, setActiveFilter] = useState(ALL_CATEGORIES_KEY);

  const filterOptions = [ALL_CATEGORIES_KEY, ...categories];
  const filteredProjects =
    activeFilter === ALL_CATEGORIES_KEY
      ? projects
      : projects.filter((p: Project) => p.category === activeFilter);
  const filteredGroups =
    activeFilter === ALL_CATEGORIES_KEY
      ? projectGroups
      : projectGroups.filter((g: ProjectGroup) => g.category === activeFilter);
  const currentLocale = normalizeLocale(locale);
  const localizedProjects = filteredProjects.map((p: Project) =>
    getLocalizedProject(p, currentLocale),
  );
  const localizedGroups = filteredGroups.map((g: ProjectGroup) =>
    getLocalizedProjectGroup(g, currentLocale),
  );
  const localizedProfessionalProjects = localizedProjects.filter(
    (p: Project) => p.type === 'professional',
  );
  const localizedPersonalProjects = localizedProjects.filter(
    (p: Project) => p.type === 'personal',
  );
  const localizedProfessionalGroups = localizedGroups.filter(
    (g: ProjectGroup) => g.type === 'professional',
  );
  const localizedPersonalGroups = localizedGroups.filter(
    (g: ProjectGroup) => g.type === 'personal',
  );

  if (!isListPage) {
    return (
      <div className={clsx(styles.page)}>
        <Outlet />
      </div>
    );
  }

  return (
    <div className={clsx(styles.page)}>
      <header className={clsx(styles.header)}>
        <p className={clsx(styles.eyebrow)}>{t.projects.eyebrow}</p>
        <h1 className={clsx(styles.title)}>{t.projects.title}</h1>
        <p className={clsx(styles.subtitle)}>
          {t.projects.subtitle}
        </p>
      </header>
      <div className={clsx(styles.filters)}>
        {filterOptions.map((category: string) => (
          <Button
            key={category}
            variant="outline"
            active={activeFilter === category}
            onClick={() => setActiveFilter(category)}
          >
            {category === ALL_CATEGORIES_KEY
              ? t.projects.all
              : CATEGORY_LABELS[category] ?? category}
          </Button>
        ))}
      </div>
      {(localizedProfessionalProjects.length > 0 || localizedProfessionalGroups.length > 0) && (
        <section className={clsx(styles.projectGroup)}>
          <h2 className={clsx(styles.groupTitle)}>{t.projects.professional}</h2>
          <div className={clsx(styles.grid)}>
            {localizedProfessionalProjects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                item={projectToCardItem(project)}
                to="/$locale/projects/$projectSlug"
                params={{ locale, projectSlug: project.slug }}
              />
            ))}
            {localizedProfessionalGroups.map((group: ProjectGroup) => (
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
      {(localizedPersonalProjects.length > 0 || localizedPersonalGroups.length > 0) && (
        <section className={clsx(styles.projectGroup)}>
          <h2 className={clsx(styles.groupTitle)}>{t.projects.personal}</h2>
          <div className={clsx(styles.grid)}>
            {localizedPersonalProjects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                item={projectToCardItem(project)}
                to="/$locale/projects/$projectSlug"
                params={{ locale, projectSlug: project.slug }}
              />
            ))}
            {localizedPersonalGroups.map((group: ProjectGroup) => (
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
    </div>
  );
}

