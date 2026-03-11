import { createFileRoute, Link } from '@tanstack/react-router';
import classNames from 'classnames/bind';
import { ArrowIcon } from '@/components/ArrowIcon';
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
            {group.type === 'professional'
              ? t.projects.professional
              : t.projects.personalProject}
            {group.category && ` · ${group.category}`}
          </span>
          <h1 className={cx('title')}>{group.title}</h1>
        </header>
        {group.description && (
          <p className={cx('description')}>{group.description}</p>
        )}
        {group.achievements && group.achievements.length > 0 && (
          <div className={cx('achievementsSection')}>
            <h2 className={cx('techHeading')}>{t.projects.keyAchievements}</h2>
            <ul className={cx('achievementsList')}>
              {group.achievements.map((achievement, idx) => (
                <li key={idx} className={cx('achievementItem')}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={cx('techSection')}>
          <h2 className={cx('techHeading')}>{t.projects.technologies}</h2>
          <ul className={cx('techList')}>
            {group.technologies.map((tech, idx) => (
              <li key={idx} className={cx('techTag')}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
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
                      {item.icon ?? '◆'}
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
