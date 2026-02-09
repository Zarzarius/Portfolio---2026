import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';
import { profile } from '../../data/profile';
import styles from './about.module.scss';

import { getSkills } from '../../server/functions';

export const Route = createFileRoute('/about')({
  loader: async () => await getSkills(),
  component: About,
});

function About() {
  const skills = Route.useLoaderData();

  return (
    <div className={clsx(styles.page)}>
      <header className={clsx(styles.header)}>
        <p className={clsx(styles.eyebrow)}>About</p>
        <h1 className={clsx(styles.title)}>A bit about me</h1>
        <p className={clsx(styles.subtitle)}>{profile.summary}</p>
      </header>

      <div className={clsx(styles.content)}>
        <h2 className={clsx(styles.sectionTitle)}>Experience</h2>
        <ul className={clsx(styles.experienceList)}>
          <li className={clsx(styles.experienceItem)}>
            <strong>React / Next.js Developer</strong> — D’Art Design Gruppe GmbH, Neuss
            <span className={clsx(styles.period)}>Feb 2024 – Dec 2025</span>
            <p className={clsx(styles.experienceDesc)}>
              Responsive web apps with React 18+ and Next.js 14 (App Router, server components).
              Immersive 3D experiences with React Three Fiber and Three.js. State management with
              Zustand and Context API. Headless CMS (Strapi, Craft CMS) and GraphQL. Performance
              optimization, code reviews, and mentoring in agile SCRUM teams.
            </p>
          </li>
          <li className={clsx(styles.experienceItem)}>
            <strong>React / Creative Developer</strong> — Demodern, Cologne
            <span className={clsx(styles.period)}>Jul 2021 – Oct 2023</span>
            <p className={clsx(styles.experienceDesc)}>
              Interactive web applications and custom UI/design systems. GSAP and CSS animations,
              Three.js/WebGL visualizations. Responsive, mobile-first layouts. REST APIs, Git/GitLab
              CI/CD, and cross-functional collaboration with designers and backend developers.
            </p>
          </li>
          <li className={clsx(styles.experienceItem)}>
            <strong>Lab Technician</strong> — Eurofins Umwelt, Wesseling
            <span className={clsx(styles.period)}>Apr 2019 – Apr 2020</span>
            <p className={clsx(styles.experienceDesc)}>
              Environmental sample processing and reporting. Database tools and systematic
              problem-solving in a technical environment.
            </p>
          </li>
        </ul>

        <h2 className={clsx(styles.sectionTitle)}>Education</h2>
        <ul className={clsx(styles.experienceList)}>
          <li className={clsx(styles.experienceItem)}>
            <strong>Full Stack Web Development (MERN Stack)</strong> — Digital Career Institute, Düsseldorf
            <span className={clsx(styles.period)}>2020 – 2021</span>
            <p className={clsx(styles.experienceDesc)}>
              Full-time bootcamp: MongoDB, Express, React, Node.js. Front-end, back-end architecture,
              database design, deployment. Project-based learning; B2 German through integrated training.
            </p>
          </li>
          <li className={clsx(styles.experienceItem)}>
            <strong>Clinical Diagnostic Laboratory Technician</strong> — IES Manuel Antonio, Vigo, Spain
            <span className={clsx(styles.period)}>2007 – 2010</span>
          </li>
        </ul>

        <h2 className={clsx(styles.sectionTitle)}>Languages</h2>
        <p className={clsx(styles.paragraph)}>
          Spanish (native) · English (B2+) · German (B2) · Portuguese (B2)
        </p>

        <h2 className={clsx(styles.sectionTitle)}>Beyond work</h2>
        <p className={clsx(styles.paragraph)}>
          Mountain biking and fitness enthusiast. Passionate about cooking and exploring international
          cuisines. Avid traveler interested in diverse cultures and perspectives.
        </p>

        <h2 className={clsx(styles.sectionTitle)}>Skills</h2>
        <ul className={clsx(styles.skills)}>
          {skills.map((skill: string) => (
            <li key={skill} className={clsx(styles.skill)}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
