import { createFileRoute, Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { getProjectGroupById } from '../../../../server/functions';
import styles from './group.module.scss';

export const Route = createFileRoute('/projects/group/$groupId')({
  loader: async ({ params }) => {
    const id = Number(params.groupId);
    if (!Number.isInteger(id) || id < 1) return { group: null };
    const group = await getProjectGroupById({ data: { id } });
    return { group };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.group) return { meta: [{ title: 'Group not found' }] };
    const { group } = loaderData;
    const title = `${group.title} — Azael AC`;
    const description = group.description
      ? group.description.slice(0, 155) + (group.description.length > 155 ? '…' : '')
      : `Collection: ${group.title}`;
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' as const },
      ],
    };
  },
  component: ProjectGroupDetailPage,
});

function ProjectGroupDetailPage() {
  const { group } = Route.useLoaderData();

  if (!group) {
    return (
      <div className={clsx(styles.container)}>
        <p className={clsx(styles.notFound)}>Group not found.</p>
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
            {group.type === 'professional' ? 'Professional' : 'Side project'}
            {group.category && ` · ${group.category}`}
          </span>
          <h1 className={clsx(styles.title)}>{group.title}</h1>
        </header>
        {group.description && (
          <p className={clsx(styles.description)}>{group.description}</p>
        )}
        {group.achievements && group.achievements.length > 0 && (
          <div className={clsx(styles.achievementsSection)}>
            <h2 className={clsx(styles.techHeading)}>Key achievements</h2>
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
          <h2 className={clsx(styles.techHeading)}>Technologies</h2>
          <ul className={clsx(styles.techList)}>
            {group.technologies.map((tech, idx) => (
              <li key={idx} className={clsx(styles.techTag)}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className={clsx(styles.itemsSection)}>
          <h2 className={clsx(styles.techHeading)}>Projects</h2>
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
