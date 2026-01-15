import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'
import styles from './about.module.scss'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const skills = ['React', 'TypeScript', 'TanStack Router', 'Vite']

  return (
    <div className={clsx(styles.container)}>
      <h1 className={clsx(styles.title)}>About Me</h1>
      <div className={clsx(styles.content)}>
        <p>
          Hello! I'm a web developer with a passion for creating beautiful and functional web
          applications.
        </p>
        <p>
          I specialize in modern web technologies and enjoy building user-friendly interfaces that
          provide great experiences.
        </p>
        <h2 className={clsx(styles.sectionTitle)}>Skills</h2>
        <ul className={clsx(styles.skillsList)}>
          {skills.map((skill) => (
            <li key={skill} className={clsx(styles.skill)}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
