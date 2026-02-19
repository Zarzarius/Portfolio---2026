import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import clsx from 'clsx';
import { ProjectCard } from '../components/ProjectCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { profile } from '../data/profile';
import styles from './index.module.scss';

import { getProjects, getCategories } from '../server/functions';
import type { Project } from '../data/projects';
const cdnUrl = import.meta.env.VITE_CDN_URL ?? '';

const ALL_CATEGORIES_KEY = 'ALL';

const CATEGORY_LABELS: Record<string, string> = {
  [ALL_CATEGORIES_KEY]: 'All',
  Demodern: 'Demodern',
  'Dart Design': "D'Art Design",
  Personal: 'Personal',
};

export const Route = createFileRoute('/')({
  loader: async () => {
    const [projects, categories] = await Promise.all([
      getProjects(),
      getCategories(),
    ]);
    return { projects, categories };
  },
  component: Home,
});

function Home() {
  const { projects, categories } = Route.useLoaderData();
  const [activeFilter, setActiveFilter] = useState(ALL_CATEGORIES_KEY);

  const filterOptions = [ALL_CATEGORIES_KEY, ...categories];

  const filteredProjects =
    activeFilter === ALL_CATEGORIES_KEY
      ? projects
      : projects.filter((p: Project) => p.category === activeFilter);

  const professionalProjects = filteredProjects.filter(
    (p: Project) => p.type === 'professional',
  );
  const personalProjects = filteredProjects.filter(
    (p: Project) => p.type === 'personal',
  );

  return (
    <div className={clsx(styles.page)}>
      <section className={clsx(styles.hero)}>
        <div className={clsx(styles.heroContent)}>
          <p className={clsx(styles.eyebrow)}>{profile.tagline}</p>
          <h1 className={clsx(styles.title)}>{profile.headline}</h1>
          <p className={clsx(styles.subtitle)}>
            React, Next.js, 3D experiences, and headless CMS. Selected work from
            D’Art Design, Demodern, and side projects.
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
        <div className={clsx(styles.heroMedia)}>
          <div
            className={clsx(styles.heroImageWrap)}
            style={{
              width: '100%',
              aspectRatio: '4 / 3',
              maxHeight: 380,
              overflow: 'hidden',
            }}
          >
            <img
              src={`${cdnUrl}/Images/hero-aza.png`}
              alt="Azael Alonso — developer at desk with laptop and workspace"
              className={clsx(styles.heroImage)}
              width={800}
              height={600}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <ScrollReveal
        className={clsx(styles.revealBlock)}
        visibleClass={styles.revealBlockVisible}
      >
        <h2 className={clsx(styles.sectionHead)}>Selected work</h2>
        <div className={clsx(styles.filters)}>
          {filterOptions.map((category: string) => (
            <button
              key={category}
              type="button"
              className={clsx(
                styles.filterBtn,
                activeFilter === category && styles.filterBtnActive,
              )}
              onClick={() => setActiveFilter(category)}
            >
              {CATEGORY_LABELS[category] ?? category}
            </button>
          ))}
        </div>

        {professionalProjects.length > 0 && (
          <section className={clsx(styles.projectGroup)}>
            <h3 className={clsx(styles.groupTitle)}>Professional</h3>
            <div className={clsx(styles.grid)}>
              {professionalProjects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {personalProjects.length > 0 && (
          <section className={clsx(styles.projectGroup)}>
            <h3 className={clsx(styles.groupTitle)}>Personal</h3>
            <div className={clsx(styles.grid)}>
              {personalProjects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
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
  );
}
