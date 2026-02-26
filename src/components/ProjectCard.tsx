import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import type { ProjectCardItem } from './projectCardItems';
import styles from './ProjectCard.module.scss';

/** Placeholder image service: stable image per id when no project image is set */
const PLACEHOLDER_IMAGE_BASE = 'https://picsum.photos/seed';

const cdnUrl = import.meta.env.VITE_CDN_URL ?? '';

function getCardImageUrl(item: { id: string | number; image?: string }): string {
  if (item.image) {
    if (item.image.startsWith('http')) return item.image;
    return cdnUrl ? `${cdnUrl}/${item.image}` : `${PLACEHOLDER_IMAGE_BASE}/${item.id}/800/440`;
  }
  return `${PLACEHOLDER_IMAGE_BASE}/${item.id}/800/440`;
}

type ProjectCardProps = {
  item: ProjectCardItem;
  to: string;
  params: Record<string, string>;
};

export function ProjectCard({ item, to, params }: ProjectCardProps) {
  return (
    <Link
      to={to}
      params={params}
      className={styles.card}
      data-project-card
      preload="intent"
    >
      <div className={styles.cardMedia}>
        <img
          className={styles.cardMediaImage}
          src={getCardImageUrl(item)}
          alt={item.imageAlt ?? item.title}
          loading="lazy"
          decoding="async"
        />
        {item.badge && (
          <span className={clsx(styles.badge)}>{item.badge}</span>
        )}
      </div>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{item.title}</h2>
        <div className={styles.cardContentSlot}>
          <p className={styles.cardDescription}>{item.description}</p>
          <div className={styles.tech}>
            {item.technologies.map((tech, idx) => (
              <span key={idx} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
