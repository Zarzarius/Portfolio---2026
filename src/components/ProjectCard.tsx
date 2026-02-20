import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import type { Project, ProjectGroup } from '../data/projects';
import styles from './ProjectCard.module.scss';

/** Placeholder image service: stable image per id when no project image is set */
const PLACEHOLDER_IMAGE_BASE = 'https://picsum.photos/seed';

function getCardImageUrl(item: { id: string | number; image?: string }): string {
  if (item.image) return item.image;
  return `${PLACEHOLDER_IMAGE_BASE}/${item.id}/800/440`;
}

/** Unified item shape for a single project or a project group (collection). */
export interface ProjectCardItem {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
  /** Optional badge, e.g. priority "A" for projects or "Collection" for groups */
  badge?: string;
  /** Optional image URL; when missing, a placeholder is used */
  image?: string;
  imageAlt?: string;
}

export function projectToCardItem(project: Project): ProjectCardItem {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    badge: project.priority,
    image: project.image,
    imageAlt: project.imageAlt,
  };
}

export function groupToCardItem(group: ProjectGroup): ProjectCardItem {
  return {
    id: group.id,
    title: group.title,
    description: group.description ?? `${group.items.length} projects`,
    technologies: group.technologies,
    badge: 'Collection',
  };
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
