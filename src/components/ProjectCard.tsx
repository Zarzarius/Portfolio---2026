import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import styles from './ProjectCard.module.scss';

export interface ProjectCardProject {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
  priority?: string;
}

type ProjectCardProps = {
  project: ProjectCardProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: String(project.id) }}
      className={styles.card}
      data-project-card
      preload="intent"
    >
      <div className={styles.cardMedia}>
        <div className={styles.cardMediaPlaceholder} />
        {project.priority && (
          <span className={clsx(styles.badge)}>{project.priority}</span>
        )}
      </div>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{project.title}</h2>
        <p className={styles.cardDescription}>{project.description}</p>
        <div className={styles.tech}>
          {project.technologies.map((tech, idx) => (
            <span key={idx} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
