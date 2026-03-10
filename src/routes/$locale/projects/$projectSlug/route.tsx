import { createFileRoute, Link } from '@tanstack/react-router';
import classNames from 'classnames/bind';
import { ArrowIcon } from '@/components/ArrowIcon';
import { getDefaultSeoMeta } from '@/data/seo';
import { getLocalizedProject } from '@/data/projects.i18n';
import { getMessages, normalizeLocale } from '@/i18n';
import { useMessages } from '@/i18n/useMessages';
import { getProjectBySlug } from '@/server/functions';
import styles from '../../../projects/$projectSlug/project.module.scss';

const cx = classNames.bind(styles);

export const Route = createFileRoute('/$locale/projects/$projectSlug')({
  loader: async ({ params }) => {
    const slug = params.projectSlug?.trim();
    if (!slug) return { project: null };
    const project = await getProjectBySlug({ data: { slug } });
    return { project };
  },
  head: ({ loaderData, params }) => {
    const locale = normalizeLocale(params.locale);
    if (!loaderData?.project) {
      const t = getMessages(locale);
      return { meta: [{ title: t.projects.projectNotFound }] };
    }
    const project = getLocalizedProject(loaderData.project, locale);
    const title = `${project.title} — Azael AC`;
    const description =
      project.description.slice(0, 155) +
      (project.description.length > 155 ? '…' : '');
    const path = `/${locale}/projects/${params.projectSlug ?? ''}`;
    const seo = getDefaultSeoMeta({
      title,
      description,
      path,
      ogType: 'article',
      locale,
      pathnameWithoutLocale: `/projects/${params.projectSlug ?? ''}`,
    });
    return { meta: seo.meta, links: seo.links, scripts: seo.scripts };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project: rawProject } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const currentLocale = normalizeLocale(locale);
  const t = useMessages();
  const project = rawProject
    ? getLocalizedProject(rawProject, currentLocale)
    : null;

  if (!project) {
    return (
      <div className={cx('container')}>
        <p className={cx('notFound')}>{t.projects.projectNotFound}</p>
        <Link
          to="/$locale/projects"
          params={{ locale: currentLocale }}
          className={cx('backLink')}
        >
          <ArrowIcon direction="left" className={cx('backLinkIcon')} />
          {t.projects.backToProjects}
        </Link>
      </div>
    );
  }

  return (
    <div className={cx('container')}>
      <Link
        to="/$locale/projects"
        params={{ locale: currentLocale }}
        className={cx('backLink')}
        preload="intent"
      >
        <ArrowIcon direction="left" className={cx('backLinkIcon')} />
        {t.projects.backToProjects}
      </Link>
      <article className={cx('article')}>
        <header className={cx('header')}>
          <span className={cx('meta')}>
            {project.type === 'professional'
              ? t.projects.professional
              : t.projects.personalProject}
            {project.category && ` · ${project.category}`}
          </span>
          <h1 className={cx('title')}>{project.title}</h1>
        </header>
        <p className={cx('description')}>{project.description}</p>
        {project.award && (
          <p className={cx('award')}>
            <strong>{t.projects.award}:</strong> {project.award}
          </p>
        )}
        {project.achievements && project.achievements.length > 0 && (
          <div className={cx('achievementsSection')}>
            <h2 className={cx('techHeading')}>
              {t.projects.keyAchievements}
            </h2>
            <ul className={cx('achievementsList')}>
              {project.achievements.map((achievement, idx) => (
                <li key={idx} className={cx('achievementItem')}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={cx('techSection')}>
          <h2 className={cx('techHeading')}>
            {t.projects.technologies}
          </h2>
          <ul className={cx('techList')}>
            {project.technologies.map((tech, idx) => (
              <li key={idx} className={cx('techTag')}>
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
            className={cx('externalLink')}
          >
            {t.projects.viewProject}
            <ArrowIcon
              direction="right"
              size={16}
              className={cx('externalLinkIcon')}
            />
          </a>
        )}
      </article>
    </div>
  );
}
