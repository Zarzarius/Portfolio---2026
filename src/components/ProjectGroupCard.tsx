import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import styles from './ProjectGroupCard.module.scss';
import type { ProjectGroup } from '../data/projects';

type ProjectGroupCardProps = {
  group: ProjectGroup;
};

export function ProjectGroupCard({ group }: ProjectGroupCardProps) {
  return (
    <Link
      to="/projects/group/$groupId"
      params={{ groupId: String(group.id) }}
      className={styles.card}
      data-project-group-card
      preload="intent"
    >
      <div className={styles.cardMedia}>
        <div className={styles.cardMediaPlaceholder} />
        <span className={clsx(styles.badge)}>Collection</span>
      </div>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{group.title}</h2>
        <p className={styles.cardDescription}>
          {group.description ?? `${group.items.length} projects`}
        </p>
        <div className={styles.tech}>
          {group.technologies.map((tech, idx) => (
            <span key={idx} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
