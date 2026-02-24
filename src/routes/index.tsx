import { createFileRoute, Link } from '@tanstack/react-router';
import clsx from 'clsx';
import {
  ProjectCard,
  projectToCardItem,
  groupToCardItem,
} from '../components/ProjectCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { profile } from '../data/profile';
import styles from './index.module.scss';

import { getProjects, getProjectGroups } from '../server/functions';
import type { Project, ProjectGroup } from '../data/projects';
const cdnUrl = import.meta.env.VITE_CDN_URL ?? '';

export const Route = createFileRoute('/')({
  loader: async () => {
    const [projects, projectGroups] = await Promise.all([
      getProjects(),
      getProjectGroups(),
    ]);
    return { projects, projectGroups };
  },
  component: Home,
});

function Home() {
  const { projects, projectGroups } = Route.useLoaderData();
  const highlightedProjects = projects.filter((p: Project) => p.highlighted);
  const highlightedGroups = projectGroups.filter(
    (g: ProjectGroup) => g.highlighted,
  );

  const professionalProjects = highlightedProjects.filter(
    (p: Project) => p.type === 'professional',
  );
  const personalProjects = highlightedProjects.filter(
    (p: Project) => p.type === 'personal',
  );
  const professionalGroups = highlightedGroups.filter(
    (g: ProjectGroup) => g.type === 'professional',
  );
  const personalGroups = highlightedGroups.filter(
    (g: ProjectGroup) => g.type === 'personal',
  );

  return (
    <>
      <section className={clsx(styles.hero)} aria-label="Introduction">
        <div className={clsx(styles.heroBackground)} aria-hidden>
          <img
            src={`${cdnUrl}/Images/hero-aza.png`}
            alt=""
            className={clsx(styles.heroImage)}
            width={1920}
            height={1080}
            fetchPriority="high"
          />
        </div>
        <div className={clsx(styles.heroOverlay)} aria-hidden />
        <div className={clsx(styles.heroContent)}>
          <p className={clsx(styles.eyebrow)}>{profile.tagline}</p>
          <h1 className={clsx(styles.title)}>{profile.headline}</h1>
          <p className={clsx(styles.subtitle)}>
            Exploring the space between design and technology to craft engaging,
            intuitive digital experiences.
          </p>
          <div className={clsx(styles.heroActions)}>
            <Link to="/projects" className={clsx(styles.heroBtnPrimary)}>
              View work
            </Link>
            <Link to="/contact" className={clsx(styles.heroBtnSecondary)}>
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <div className={clsx(styles.page)}>
        <ScrollReveal
          className={clsx(styles.revealBlock)}
          visibleClass={styles.revealBlockVisible}
        >
        <h2 className={clsx(styles.sectionHead)}>Selected work</h2>

        {(professionalProjects.length > 0 || professionalGroups.length > 0) && (
          <section className={clsx(styles.projectGroup)}>
            <h3 className={clsx(styles.groupTitle)}>Professional</h3>
            <div className={clsx(styles.grid)}>
              {professionalProjects.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  item={projectToCardItem(project)}
                  to="/projects/$projectSlug"
                  params={{ projectSlug: project.slug }}
                />
              ))}
              {professionalGroups.map((group: ProjectGroup) => (
                <ProjectCard
                  key={`group-${group.id}`}
                  item={groupToCardItem(group)}
                  to="/projects/group/$groupSlug"
                  params={{ groupSlug: group.slug }}
                />
              ))}
            </div>
          </section>
        )}

        {(personalProjects.length > 0 || personalGroups.length > 0) && (
          <section className={clsx(styles.projectGroup)}>
            <h3 className={clsx(styles.groupTitle)}>Personal</h3>
            <div className={clsx(styles.grid)}>
              {personalProjects.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  item={projectToCardItem(project)}
                  to="/projects/$projectSlug"
                  params={{ projectSlug: project.slug }}
                />
              ))}
              {personalGroups.map((group: ProjectGroup) => (
                <ProjectCard
                  key={`group-${group.id}`}
                  item={groupToCardItem(group)}
                  to="/projects/group/$groupSlug"
                  params={{ groupSlug: group.slug }}
                />
              ))}
            </div>
          </section>
        )}
      </ScrollReveal>

      <section className={clsx(styles.cta)}>
        <div className={clsx(styles.ctaContent)}>
          <h2 className={clsx(styles.ctaTitle)}>Let’s work together</h2>
          <p className={clsx(styles.ctaText)}>
            Based in {profile.location}. Open to new projects and collaborations
            — get in touch.
          </p>
        </div>
        <div className={clsx(styles.ctaActions)}>
          <Link to="/contact" className={clsx(styles.ctaPrimary)}>
            Get in touch
          </Link>
          <Link to="/projects" className={clsx(styles.ctaSecondary)}>
            View all projects
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
