import { createFileRoute, Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { getDefaultSeoMeta } from '../../../data/seo';
import { getProjectBySlug } from '../../../server/functions';
import styles from './project.module.scss';

export const Route = createFileRoute('/projects/$projectSlug')({
  loader: async ({ params }) => {
    const slug = params.projectSlug?.trim();
    if (!slug) return { project: null };
    const project = await getProjectBySlug({ data: { slug } });
    return { project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData?.project) return { meta: [{ title: 'Project not found' }] };
    const { project } = loaderData;
    const title = `${project.title} — Azael AC`;
    const description =
      project.description.slice(0, 155) + (project.description.length > 155 ? '…' : '');
    const path = `/projects/${params.projectSlug ?? ''}`;
    const seo = getDefaultSeoMeta({ title, description, path, ogType: 'article' });
    return { meta: seo.meta, links: seo.links, scripts: seo.scripts };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();

  if (!project) {
    return (
      <div className={clsx(styles.container)}>
        <p className={clsx(styles.notFound)}>Project not found.</p>
        <Link to="/projects" className={clsx(styles.backLink)}>
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className={clsx(styles.container)}>
      <Link to="/projects" className={clsx(styles.backLink)} preload="intent">
        ← Back to projects
      </Link>
      <article className={clsx(styles.article)}>
        <header className={clsx(styles.header)}>
          <span className={clsx(styles.meta)}>
            {project.type === 'professional' ? 'Professional' : 'Personal project'}
            {project.category && ` · ${project.category}`}
          </span>
          <h1 className={clsx(styles.title)}>{project.title}</h1>
        </header>
        <p className={clsx(styles.description)}>{project.description}</p>
        {project.award && (
          <p className={clsx(styles.award)}>
            <strong>Award:</strong> {project.award}
          </p>
        )}
        {project.achievements && project.achievements.length > 0 && (
          <div className={clsx(styles.achievementsSection)}>
            <h2 className={clsx(styles.techHeading)}>Key achievements</h2>
            <ul className={clsx(styles.achievementsList)}>
              {project.achievements.map((achievement, idx) => (
                <li key={idx} className={clsx(styles.achievementItem)}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={clsx(styles.techSection)}>
          <h2 className={clsx(styles.techHeading)}>Technologies</h2>
          <ul className={clsx(styles.techList)}>
            {project.technologies.map((tech, idx) => (
              <li key={idx} className={clsx(styles.techTag)}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.externalLink)}
          >
            View project →
          </a>
        )}
      </article>
    </div>
  );
}
