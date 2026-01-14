import { createFileRoute } from '@tanstack/react-router'
import styles from './about.module.scss'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const skills = ['React', 'TypeScript', 'TanStack Router', 'Vite']

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Me</h1>
      <div className={styles.content}>
        <p>
          Hello! I'm a web developer with a passion for creating beautiful and functional web
          applications.
        </p>
        <p>
          I specialize in modern web technologies and enjoy building user-friendly interfaces that
          provide great experiences.
        </p>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <ul className={styles.skillsList}>
          {skills.map((skill) => (
            <li key={skill} className={styles.skill}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
