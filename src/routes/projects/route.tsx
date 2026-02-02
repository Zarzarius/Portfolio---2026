import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'
import styles from './projects.module.scss'

import { getShowcaseProjects } from '../../server/functions';

export const Route = createFileRoute('/projects')({
  loader: async () => await getShowcaseProjects(),
  component: Projects,
});

function Projects() {
  const projects = Route.useLoaderData();

  return (
    <div className={clsx(styles.container)}>
      <h1 className={clsx(styles.title)}>Projects</h1>
      <div className={clsx(styles.grid)}>
        {projects.map((project) => (
          <div key={project.id} className={clsx(styles.card)}>
            <h2 className={clsx(styles.cardTitle)}>{project.title}</h2>
            <p className={clsx(styles.cardDescription)}>
              {project.description}
            </p>
            <div className={clsx(styles.techList)}>
              {project.technologies.map((tech, idx) => (
                <span key={idx} className={clsx(styles.techTag)}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
