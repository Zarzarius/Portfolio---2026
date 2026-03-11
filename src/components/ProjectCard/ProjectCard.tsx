import { Link } from '@tanstack/react-router';
import classNames from 'classnames/bind';
import type { ProjectCardItem } from './projectCardItems';
import styles from './ProjectCard.module.scss';

const cx = classNames.bind(styles);

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
      className={cx('card')}
      data-project-card
      preload="intent"
    >
      <div className={cx('cardMedia')}>
        <img
          className={cx('cardMediaImage')}
          src={getCardImageUrl(item)}
          alt={item.imageAlt ?? item.title}
          loading="lazy"
          decoding="async"
        />
        {item.badge && (
          <span className={cx('badge')}>{item.badge}</span>
        )}
      </div>
      <div className={cx('cardBody')}>
        <h2 className={cx('cardTitle')}>{item.title}</h2>
        <div className={cx('cardContentSlot')}>
          <p className={cx('cardDescription')}>{item.description}</p>
          <div className={cx('tech')}>
            {item.technologies.map((tech, idx) => (
              <span key={idx} className={cx('techTag')}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
