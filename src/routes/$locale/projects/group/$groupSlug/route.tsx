import { createFileRoute } from '@tanstack/react-router';
import classNames from 'classnames/bind';
import {
  AchievementsList,
  BackToProjectsLink,
  DetailHeader,
  TechTagList,
  formatProjectMeta,
  getProjectTypeLabel,
} from '@/components/ProjectDetail';
import { getDefaultSeoMeta } from '@/data/seo';
import { getLocalizedProjectGroup } from '@/data/projects.i18n';
import { getMessages, normalizeLocale } from '@/i18n';
import { useMessages } from '@/i18n/useMessages';
import { getProjectGroupBySlug } from '@/server/functions';
import styles from '../../../../projects/group/$groupSlug/group.module.scss';

const cx = classNames.bind(styles);

export const Route = createFileRoute('/$locale/projects/group/$groupSlug')({
  loader: async ({ params }) => {
    const slug = params.groupSlug?.trim();
    if (!slug) return { group: null };
    const group = await getProjectGroupBySlug({ data: { slug } });
    return { group };
  },
  head: ({ loaderData, params }) => {
    const locale = normalizeLocale(params.locale);
    if (!loaderData?.group) {
      const t = getMessages(locale);
      return { meta: [{ title: t.projects.groupNotFound }] };
    }
    const group = getLocalizedProjectGroup(loaderData.group, locale);
    const title = `${group.title} — Azael AC`;
    const description = group.description
      ? group.description.slice(0, 155) +
        (group.description.length > 155 ? '…' : '')
      : `Collection: ${group.title}`;
    const path = `/${locale}/projects/group/${params.groupSlug ?? ''}`;
    const seo = getDefaultSeoMeta({
      title,
      description,
      path,
      ogType: 'article',
      locale,
      pathnameWithoutLocale: `/projects/group/${params.groupSlug ?? ''}`,
    });
    return { meta: seo.meta, links: seo.links, scripts: seo.scripts };
  },
  component: ProjectGroupDetailPage,
});

function ProjectGroupDetailPage() {
  const { group: rawGroup } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const currentLocale = normalizeLocale(locale);
  const t = useMessages();
  const group = rawGroup
    ? getLocalizedProjectGroup(rawGroup, currentLocale)
    : null;

  if (!group) {
    return (
      <div className={cx('container')}>
        <p className={cx('notFound')}>{t.projects.groupNotFound}</p>
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
    group.type,
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
          title={group.title}
          meta={formatProjectMeta(typeLabel, group.category)}
          headerClassName={cx('header')}
          metaClassName={cx('meta')}
          titleClassName={cx('title')}
        />
        {group.description && (
          <p className={cx('description')}>{group.description}</p>
        )}
        <AchievementsList
          achievements={group.achievements}
          heading={t.projects.keyAchievements}
          sectionClassName={cx('achievementsSection')}
          headingClassName={cx('techHeading')}
          listClassName={cx('achievementsList')}
          itemClassName={cx('achievementItem')}
        />
        <TechTagList
          technologies={group.technologies}
          heading={t.projects.technologies}
          sectionClassName={cx('techSection')}
          headingClassName={cx('techHeading')}
          listClassName={cx('techList')}
          tagClassName={cx('techTag')}
        />
        <div className={cx('itemsSection')}>
          <h2 className={cx('techHeading')}>{t.projects.projectsList}</h2>
          <ul className={cx('itemsList')}>
            {group.items.map((item) => (
              <li key={item.id} className={cx('item')}>
                <div className={cx('itemMedia')}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      className={cx('itemThumbnail')}
                      loading="lazy"
                    />
                  ) : (
                    <span className={cx('itemIcon')} aria-hidden>
                      {item.icon ?? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                          <circle
                            cx="7.5"
                            cy="7.5"
                            r=".5"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
                <div className={cx('itemContent')}>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('itemLink')}
                    >
                      <span className={cx('itemTitle')}>{item.title}</span>
                      {item.description && (
                        <span className={cx('itemDescription')}>
                          {item.description}
                        </span>
                      )}
                      <span className={cx('itemArrow')}>→</span>
                    </a>
                  ) : (
                    <>
                      <span className={cx('itemTitle')}>{item.title}</span>
                      {item.description && (
                        <p className={cx('itemDescription')}>
                          {item.description}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
