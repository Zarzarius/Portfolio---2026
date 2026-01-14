import { createFileRoute } from '@tanstack/react-router'
import styles from './projects.module.scss'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Project One',
      description:
        'A description of your first project. Showcase what technologies you used and what problems it solved.',
      technologies: ['React', 'TypeScript', 'Vite'],
    },
    {
      id: 2,
      title: 'Project Two',
      description:
        'Another project description. Highlight key features and your role in the project.',
      technologies: ['React', 'Node.js', 'MongoDB'],
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'A third project to showcase your versatility and range of skills.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
    },
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Projects</h1>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{project.title}</h2>
            <p className={styles.cardDescription}>{project.description}</p>
            <div className={styles.techList}>
              {project.technologies.map((tech, idx) => (
                <span key={idx} className={styles.techTag}>
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
