import { createFileRoute } from '@tanstack/react-router';
import classNames from 'classnames/bind';
import { ArrowIcon } from '@/components/ArrowIcon';
import {
  AchievementsList,
  BackToProjectsLink,
  DetailHeader,
  TechTagList,
  formatProjectMeta,
  getProjectTypeLabel,
} from '@/components/ProjectDetail';
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
        <BackToProjectsLink
          locale={currentLocale}
          label={t.projects.backToProjects}
          className={cx('backLink')}
          iconClassName={cx('backLinkIcon')}
        />
      </div>
    );
  }

  const typeLabel = getProjectTypeLabel(
    project.type,
    t.projects.professional,
    t.projects.personalProject,
  );

  return (
    <div className={cx('container')}>
      <BackToProjectsLink
        locale={currentLocale}
        label={t.projects.backToProjects}
        className={cx('backLink')}
        iconClassName={cx('backLinkIcon')}
      />
      <article className={cx('article')}>
        <DetailHeader
          title={project.title}
          meta={formatProjectMeta(typeLabel, project.category)}
          headerClassName={cx('header')}
          metaClassName={cx('meta')}
          titleClassName={cx('title')}
        />
        <p className={cx('description')}>{project.description}</p>
        {project.award && (
          <p className={cx('award')}>
            <strong>{t.projects.award}:</strong> {project.award}
          </p>
        )}
        <AchievementsList
          achievements={project.achievements}
          heading={t.projects.keyAchievements}
          sectionClassName={cx('achievementsSection')}
          headingClassName={cx('techHeading')}
          listClassName={cx('achievementsList')}
          itemClassName={cx('achievementItem')}
        />
        <TechTagList
          technologies={project.technologies}
          heading={t.projects.technologies}
          sectionClassName={cx('techSection')}
          headingClassName={cx('techHeading')}
          listClassName={cx('techList')}
          tagClassName={cx('techTag')}
        />
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
