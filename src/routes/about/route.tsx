import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';
import { profile } from '../../data/profile';
import styles from './about.module.scss';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <div className={clsx(styles.page)}>
      <header className={clsx(styles.header)}>
        <p className={clsx(styles.eyebrow)}>About</p>
        <h1 className={clsx(styles.title)}>Who I am</h1>
        <p className={clsx(styles.subtitle)}>{profile.summary}</p>
      </header>

      <div className={clsx(styles.content)}>
        <h2 className={clsx(styles.sectionTitle)}>Languages</h2>
        <p className={clsx(styles.paragraph)}>
          Spanish (native) · English (B2+) · German (B2) · Portuguese (B2)
        </p>

        <h2 className={clsx(styles.sectionTitle)}>Beyond work</h2>
        <p className={clsx(styles.paragraph)}>
          Mountain biking and fitness enthusiast. Passionate about cooking and
          exploring international cuisines. Avid traveler interested in diverse
          cultures and perspectives.
        </p>
      </div>
    </div>
  );
}
