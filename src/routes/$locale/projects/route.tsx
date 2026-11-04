import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Button } from '@/components/Button';
import { ProjectSections } from '@/components/ProjectSections';
import styles from '../../projects/projects.module.scss';
import {
  getProjects,
  getProjectGroups,
  getCategories,
} from '@/server/functions';
import { getDefaultSeoMeta } from '@/data/seo';
import type { Project, ProjectGroup } from '@/data/projects';
import {
  getLocalizedProject,
  getLocalizedProjectGroup,
} from '@/data/projects.i18n';
import { getMessages, normalizeLocale } from '@/i18n';
import { useMessages } from '@/i18n/useMessages';

const cx = classNames.bind(styles);
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
  head: ({ params, loaderData, matches }) => {
    const leaf = matches[matches.length - 1];
    if (leaf?.routeId !== '/$locale/projects') return {};
    const locale = normalizeLocale(params.locale);
    const t = getMessages(locale);
    const listItems = [
      ...(loaderData?.projects ?? []).map((project: Project) => ({
        name: getLocalizedProject(project, locale).title,
        path: `/${locale}/projects/${project.slug}`,
      })),
      ...(loaderData?.projectGroups ?? []).map((group: ProjectGroup) => ({
        name: getLocalizedProjectGroup(group, locale).title,
        path: `/${locale}/projects/group/${group.slug}`,
      })),
    ];
    const seo = getDefaultSeoMeta({
      locale,
      path: `/${locale}/projects`,
      pathnameWithoutLocale: '/projects',
      title: t.seo.projectsTitle,
      description: t.seo.projectsDescription,
      kind: 'projects',
      listItems,
    });
    return { meta: seo.meta, links: seo.links, scripts: seo.scripts };
  },
  component: ProjectsLayout,
});

function ProjectsLayout() {
  const { projects, projectGroups, categories } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const t = useMessages();
  const pathname = useRouterState({
    select: (state) => state.matches[state.matches.length - 1]?.pathname,
  });
  const isListPage = pathname === `/${locale}/projects`;
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

  if (!isListPage) {
    return (
      <div className={cx('page')}>
        <Outlet />
      </div>
    );
  }

  return (
    <div className={cx('page')} data-stagger>
      <header className={cx('header')}>
        <p className={cx('eyebrow')}>{t.projects.eyebrow}</p>
        <h1 className={cx('title')}>{t.projects.title}</h1>
        <p className={cx('subtitle')}>{t.projects.subtitle}</p>
      </header>
      <div className={cx('filters')}>
        {filterOptions.map((category: string) => (
          <Button
            key={category}
            variant="outline"
            active={activeFilter === category}
            onClick={() => setActiveFilter(category)}
          >
            {category === ALL_CATEGORIES_KEY
              ? t.projects.all
              : (CATEGORY_LABELS[category] ?? category)}
          </Button>
        ))}
      </div>
      <ProjectSections
        projects={localizedProjects}
        groups={localizedGroups}
        locale={locale}
        professionalLabel={t.projects.professional}
        personalLabel={t.projects.personal}
        collectionLabel={t.projects.collection}
        projectsLabel={t.projects.projectsList.toLowerCase()}
        classNames={{
          projectGroup: cx('projectGroup'),
          groupTitle: cx('groupTitle'),
          grid: cx('grid'),
        }}
      />
    </div>
  );
}
