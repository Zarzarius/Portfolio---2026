import { createFileRoute, Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { getDefaultSeoMeta } from '@/data/seo';
import { getLocalizedProject } from '@/data/projects.i18n';
import { getMessages } from '@/i18n';
import { useMessages } from '@/i18n/useMessages';
import { getProjectBySlug } from '@/server/functions';
import styles from '../../../projects/$projectSlug/project.module.scss';

export const Route = createFileRoute('/$locale/projects/$projectSlug')({
  loader: async ({ params }) => {
    const slug = params.projectSlug?.trim();
    if (!slug) return { project: null };
    const project = await getProjectBySlug({ data: { slug } });
    return { project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData?.project) {
      const t = getMessages(params.locale);
      return { meta: [{ title: t.projects.projectNotFound }] };
    }
    const project = getLocalizedProject(loaderData.project, params.locale);
    const title = `${project.title} — Azael AC`;
    const description =
      project.description.slice(0, 155) + (project.description.length > 155 ? '…' : '');
    const path = `/${params.locale}/projects/${params.projectSlug ?? ''}`;
    const seo = getDefaultSeoMeta({
      title,
      description,
      path,
      ogType: 'article',
      locale: params.locale,
      pathnameWithoutLocale: `/projects/${params.projectSlug ?? ''}`,
    });
    return { meta: seo.meta, links: seo.links, scripts: seo.scripts };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project: rawProject } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const t = useMessages();
  const project = rawProject ? getLocalizedProject(rawProject, locale) : null;

  if (!project) {
    return (
      <div className={clsx(styles.container)}>
        <p className={clsx(styles.notFound)}>{t.projects.projectNotFound}</p>
        <Link to="/$locale/projects" params={{ locale }} className={clsx(styles.backLink)}>
          ← {t.projects.backToProjects}
        </Link>
      </div>
    );
  }

  return (
    <div className={clsx(styles.container)}>
      <Link
        to="/$locale/projects"
        params={{ locale }}
        className={clsx(styles.backLink)}
        preload="intent"
      >
        ← {t.projects.backToProjects}
      </Link>
      <article className={clsx(styles.article)}>
        <header className={clsx(styles.header)}>
          <span className={clsx(styles.meta)}>
            {project.type === 'professional'
              ? t.projects.professional
              : t.projects.personalProject}
            {project.category && ` · ${project.category}`}
          </span>
          <h1 className={clsx(styles.title)}>{project.title}</h1>
        </header>
        <p className={clsx(styles.description)}>{project.description}</p>
        {project.award && (
          <p className={clsx(styles.award)}>
            <strong>{t.projects.award}:</strong> {project.award}
          </p>
        )}
        {project.achievements && project.achievements.length > 0 && (
          <div className={clsx(styles.achievementsSection)}>
            <h2 className={clsx(styles.techHeading)}>{t.projects.keyAchievements}</h2>
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
          <h2 className={clsx(styles.techHeading)}>{t.projects.technologies}</h2>
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
            {t.projects.viewProject} →
          </a>
        )}
      </article>
    </div>
  );
}

