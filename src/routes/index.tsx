import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import styles from './index.module.scss';

export const Route = createFileRoute('/')({
  component: Home,
});

const projects = [
  {
    id: 1,
    title: 'NEURAL_INTERFACE_V4',
    description:
      'Advanced neural networking visualization tool with real-time data processing and WebGL layers.',
    technologies: ['REACT', 'THREE.JS', 'WEBGL', 'D3'],
    priority: 'A',
    category: 'interface',
  },
  {
    id: 2,
    title: 'VOX_COIN_DASH',
    description:
      'Next-gen crypto asset management platform with D3-driven analytics and real-time market data.',
    technologies: ['REACT', 'D3', 'NODE.JS', 'MONGO'],
    priority: 'A',
    category: 'interface',
  },
  {
    id: 3,
    title: 'CYBER_GRID_UI',
    description:
      'Open-source modular design system for high-performance web applications with 3D rendering capabilities.',
    technologies: ['REACT', 'THREE.JS', 'TYPESCRIPT'],
    category: 'interface',
  },
  {
    id: 4,
    title: 'QUANTUM_COMPUTE',
    description:
      'Predictive analytics engine using hybrid quantum-classical algorithms for complex data processing.',
    technologies: ['PYTHON', 'QUANTUM', 'ML', 'CLOUD'],
    category: 'backend',
  },
  {
    id: 5,
    title: 'GHOST_PROTOCOL',
    description:
      'End-to-end encrypted messaging terminal with zero-knowledge architecture and secure channels.',
    technologies: ['REACT', 'NODE.JS', 'ENCRYPTION', 'WEBSOCKET'],
    category: 'backend',
  },
  {
    id: 6,
    title: 'CLOUD_OPS_MONITOR',
    description:
      'Real-time infrastructure monitoring system with automated scaling and performance optimization.',
    technologies: ['KUBERNETES', 'DOCKER', 'PROMETHEUS', 'GRAFANA'],
    category: 'cloud',
  },
];

const categories = ['ALL_SYSTEMS', 'FRONT_END', 'BACK_END', '3D_GRAPHICS'];

function Home() {
  const [activeFilter, setActiveFilter] = useState('ALL_SYSTEMS');

  const filteredProjects =
    activeFilter === 'ALL_SYSTEMS'
      ? projects
      : projects.filter((p) => {
          const filterMap: Record<string, string> = {
            INTERFACE: 'interface',
            BACK_END: 'backend',
            GRAPHICS: 'graphics',
            CLOUD_OPS: 'cloud',
          };
          return p.category === filterMap[activeFilter];
        });

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleSection}>
          <div className={styles.titlePrefix}>01//</div>
          <h1 className={styles.title}>FEATURED_WORKS</h1>
          <div className={styles.commandLine}>
            &gt; sudo run showcase.sh --filter=high performance
            --status=production
          </div>
        </div>
        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                activeFilter === category ? styles.active : ''
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.projectImage}>
              <div className={styles.projectImagePlaceholder}>◼</div>
              {project.priority && (
                <div className={styles.priorityTag}>
                  PRIORITY {project.priority}
                </div>
              )}
            </div>
            <div className={styles.projectContent}>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectTech}>
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            READY TO BUILD <span className={styles.highlight}>THE FUTURE?</span>
          </h2>
          <p className={styles.ctaDescription}>
            Let's collaborate on your next high-tech project. Open for new
            architectural challenges and complex system integrations.
          </p>
        </div>
        <div className={styles.ctaButtons}>
          <button className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
            INITIALIZE_CONTACT &gt;
          </button>
          <button
            className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}
          >
            VIEW_ARCHIVES
          </button>
        </div>
      </div>
    </div>
  );
}
