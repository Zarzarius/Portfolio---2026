import { createFileRoute, Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { getDefaultSeoMeta } from '../../../../../data/seo';
import { getLocalizedProjectGroup } from '../../../../../data/projects.i18n';
import { getMessages } from '../../../../../i18n';
import { useMessages } from '../../../../../i18n/useMessages';
import { getProjectGroupBySlug } from '../../../../../server/functions';
import styles from '../../../../projects/group/$groupSlug/group.module.scss';

export const Route = createFileRoute('/$locale/projects/group/$groupSlug')({
  loader: async ({ params }) => {
    const slug = params.groupSlug?.trim();
    if (!slug) return { group: null };
    const group = await getProjectGroupBySlug({ data: { slug } });
    return { group };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData?.group) {
      const t = getMessages(params.locale);
      return { meta: [{ title: t.projects.groupNotFound }] };
    }
    const group = getLocalizedProjectGroup(loaderData.group, params.locale);
    const title = `${group.title} — Azael AC`;
    const description = group.description
      ? group.description.slice(0, 155) + (group.description.length > 155 ? '…' : '')
      : `Collection: ${group.title}`;
    const path = `/${params.locale}/projects/group/${params.groupSlug ?? ''}`;
    const seo = getDefaultSeoMeta({
      title,
      description,
      path,
      ogType: 'article',
      locale: params.locale,
      pathnameWithoutLocale: `/projects/group/${params.groupSlug ?? ''}`,
    });
    return { meta: seo.meta, links: seo.links, scripts: seo.scripts };
  },
  component: ProjectGroupDetailPage,
});

function ProjectGroupDetailPage() {
  const { group: rawGroup } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const t = useMessages();
  const group = rawGroup ? getLocalizedProjectGroup(rawGroup, locale) : null;

  if (!group) {
    return (
      <div className={clsx(styles.container)}>
        <p className={clsx(styles.notFound)}>{t.projects.groupNotFound}</p>
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
            {group.type === 'professional'
              ? t.projects.professional
              : t.projects.personalProject}
            {group.category && ` · ${group.category}`}
          </span>
          <h1 className={clsx(styles.title)}>{group.title}</h1>
        </header>
        {group.description && (
          <p className={clsx(styles.description)}>{group.description}</p>
        )}
        {group.achievements && group.achievements.length > 0 && (
          <div className={clsx(styles.achievementsSection)}>
            <h2 className={clsx(styles.techHeading)}>{t.projects.keyAchievements}</h2>
            <ul className={clsx(styles.achievementsList)}>
              {group.achievements.map((achievement, idx) => (
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
            {group.technologies.map((tech, idx) => (
              <li key={idx} className={clsx(styles.techTag)}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className={clsx(styles.itemsSection)}>
          <h2 className={clsx(styles.techHeading)}>{t.projects.projectsList}</h2>
          <ul className={clsx(styles.itemsList)}>
            {group.items.map((item) => (
              <li key={item.id} className={clsx(styles.item)}>
                <div className={clsx(styles.itemMedia)}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      className={clsx(styles.itemThumbnail)}
                      loading="lazy"
                    />
                  ) : (
                    <span className={clsx(styles.itemIcon)} aria-hidden>
                      {item.icon ?? '◆'}
                    </span>
                  )}
                </div>
                <div className={clsx(styles.itemContent)}>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(styles.itemLink)}
                    >
                      <span className={clsx(styles.itemTitle)}>{item.title}</span>
                      {item.description && (
                        <span className={clsx(styles.itemDescription)}>
                          {item.description}
                        </span>
                      )}
                      <span className={clsx(styles.itemArrow)}>→</span>
                    </a>
                  ) : (
                    <>
                      <span className={clsx(styles.itemTitle)}>{item.title}</span>
                      {item.description && (
                        <p className={clsx(styles.itemDescription)}>
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

