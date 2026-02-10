import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import clsx from 'clsx';
import { ScrollReveal } from '../components/ScrollReveal';
import { profile } from '../data/profile';
import styles from './index.module.scss';

import { getProjects, getCategories } from '../server/functions';
const cdnUrl = import.meta.env.VITE_CDN_URL ?? '';
const CATEGORY_LABELS: Record<string, string> = {
  ALL_SYSTEMS: 'All',
  FRONT_END: 'Frontend',
  BACK_END: 'Backend',
  '3D_GRAPHICS': '3D / Graphics',
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

interface Project {
  id: string | number;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  priority?: string;
  type?: 'professional' | 'hobby';
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardMedia}>
        <div className={styles.cardMediaPlaceholder} />
        {project.priority && (
          <span className={styles.badge}>{project.priority}</span>
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
    </article>
  );
}

function Home() {
  const { projects, categories } = Route.useLoaderData();
  const [activeFilter, setActiveFilter] = useState('ALL_SYSTEMS');

  const filteredProjects =
    activeFilter === 'ALL_SYSTEMS'
      ? projects
      : projects.filter((p: Project) => {
          const filterMap: Record<string, string> = {
            FRONT_END: 'interface',
            BACK_END: 'backend',
            '3D_GRAPHICS': 'graphics',
          };
          return p.category === filterMap[activeFilter];
        });

  const professionalProjects = filteredProjects.filter(
    (p: Project) => (p.type ?? 'professional') === 'professional',
  );
  const hobbyProjects = filteredProjects.filter(
    (p: Project) => (p.type ?? 'professional') === 'hobby',
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
          {categories.map((category: string) => (
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

        {hobbyProjects.length > 0 && (
          <section className={clsx(styles.projectGroup)}>
            <h3 className={clsx(styles.groupTitle)}>Hobby</h3>
            <div className={clsx(styles.grid)}>
              {hobbyProjects.map((project: Project) => (
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
