import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

import { getProjects, getCategories } from '../server/functions';

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
  id: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  priority?: string;
}

function Home() {
  const { projects, categories } = Route.useLoaderData();
  const [activeFilter, setActiveFilter] = useState('ALL_SYSTEMS');

  const filteredProjects =
    activeFilter === 'ALL_SYSTEMS'
      ? projects
      : projects.filter((p: Project) => {
          const filterMap: Record<string, string> = {
            INTERFACE: 'interface',
            BACK_END: 'backend',
            GRAPHICS: 'graphics',
            CLOUD_OPS: 'cloud',
          };
          return p.category === filterMap[activeFilter];
        });

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.sectionHeader)}>
        <div className={clsx(styles.titleSection)}>
          <div className={clsx(styles.titlePrefix)}>01//</div>
          <h1 className={clsx(styles.title)}>FEATURED_WORKS</h1>
          <div className={clsx(styles.commandLine)}>
            &gt; sudo run showcase.sh --filter=high performance
            --status=production
          </div>
        </div>
        <div className={clsx(styles.filters)}>
          {categories.map((category) => (
            <button
              key={category}
              className={clsx(
                styles.filterButton,
                activeFilter === category && styles.active,
              )}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={clsx(styles.projectsGrid)}>
        {filteredProjects.map((project) => (
          <div key={project.id} className={clsx(styles.projectCard)}>
            <div className={clsx(styles.projectImage)}>
              <div className={clsx(styles.projectImagePlaceholder)}>◼</div>
              {project.priority && (
                <div className={clsx(styles.priorityTag)}>
                  PRIORITY {project.priority}
                </div>
              )}
            </div>
            <div className={clsx(styles.projectContent)}>
              <h2 className={clsx(styles.projectTitle)}>{project.title}</h2>
              <p className={clsx(styles.projectDescription)}>
                {project.description}
              </p>
              <div className={clsx(styles.projectTech)}>
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className={clsx(styles.techTag)}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={clsx(styles.ctaSection)}>
        <div className={clsx(styles.ctaContent)}>
          <h2 className={clsx(styles.ctaTitle)}>
            READY TO BUILD{' '}
            <span className={clsx(styles.highlight)}>THE FUTURE?</span>
          </h2>
          <p className={clsx(styles.ctaDescription)}>
            Let's collaborate on your next high-tech project. Open for new
            architectural challenges and complex system integrations.
          </p>
        </div>
        <div className={clsx(styles.ctaButtons)}>
          <button className={clsx(styles.ctaButton, styles.ctaButtonPrimary)}>
            INITIALIZE_CONTACT &gt;
          </button>
          <button
            className={clsx(styles.ctaButton, styles.ctaButtonSecondary)}
          >
            VIEW_ARCHIVES
          </button>
        </div>
      </div>
    </div>
  );
}
