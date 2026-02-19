import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import clsx from 'clsx';
import { ProjectCard } from '../../components/ProjectCard';
import styles from './projects.module.scss';
import { getProjects } from '../../server/functions';

export const Route = createFileRoute('/projects')({
  loader: async () => await getProjects(),
  component: ProjectsLayout,
});

function ProjectsLayout() {
  const projects = Route.useLoaderData();
  const location = useLocation();
  const isListPage = location.pathname === '/projects';

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
      <div className={clsx(styles.grid)}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
