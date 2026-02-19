import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import clsx from 'clsx';
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectGroupCard } from '../../components/ProjectGroupCard';
import styles from './projects.module.scss';
import {
  getProjects,
  getProjectGroups,
  getCategories,
} from '../../server/functions';
import type { Project, ProjectGroup } from '../../data/projects';

const ALL_CATEGORIES_KEY = 'ALL';

const CATEGORY_LABELS: Record<string, string> = {
  [ALL_CATEGORIES_KEY]: 'All',
  Demodern: 'Demodern',
  'Dart Design': "D'Art Design",
  Personal: 'Personal',
};

export const Route = createFileRoute('/projects')({
  loader: async () => {
    const [projects, projectGroups, categories] = await Promise.all([
      getProjects(),
      getProjectGroups(),
      getCategories(),
    ]);
    return { projects, projectGroups, categories };
  },
  component: ProjectsLayout,
});

function ProjectsLayout() {
  const { projects, projectGroups, categories } = Route.useLoaderData();
  const location = useLocation();
  const isListPage = location.pathname === '/projects';
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
  const professionalProjects = filteredProjects.filter(
    (p: Project) => p.type === 'professional',
  );
  const personalProjects = filteredProjects.filter(
    (p: Project) => p.type === 'personal',
  );
  const professionalGroups = filteredGroups.filter(
    (g: ProjectGroup) => g.type === 'professional',
  );
  const personalGroups = filteredGroups.filter(
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
        <p className={clsx(styles.eyebrow)}>Projects</p>
        <h1 className={clsx(styles.title)}>Selected work</h1>
        <p className={clsx(styles.subtitle)}>
          Professional and side projects from D’Art Design, Demodern, and more.
        </p>
      </header>
      <div className={clsx(styles.filters)}>
        {filterOptions.map((category: string) => (
          <button
            key={category}
            type="button"
            className={clsx(
              styles.filterBtn,
              activeFilter === category && styles.filterBtnActive,
            )}
            onClick={() => setActiveFilter(category)}
          >
            {CATEGORY_LABELS[category] ?? category}
          </button>
        ))}
      </div>
      {(professionalProjects.length > 0 || professionalGroups.length > 0) && (
        <section className={clsx(styles.projectGroup)}>
          <h2 className={clsx(styles.groupTitle)}>Professional</h2>
          <div className={clsx(styles.grid)}>
            {professionalProjects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {professionalGroups.map((group: ProjectGroup) => (
              <ProjectGroupCard
                key={`group-${group.id}`}
                group={group}
              />
            ))}
          </div>
        </section>
      )}
      {(personalProjects.length > 0 || personalGroups.length > 0) && (
        <section className={clsx(styles.projectGroup)}>
          <h2 className={clsx(styles.groupTitle)}>Personal</h2>
          <div className={clsx(styles.grid)}>
            {personalProjects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {personalGroups.map((group: ProjectGroup) => (
              <ProjectGroupCard
                key={`group-${group.id}`}
                group={group}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
