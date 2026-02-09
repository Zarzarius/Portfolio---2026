import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';
import { useMemo } from 'react';
import styles from './stack.module.scss';

import type { StackCategory, StackTech } from '../../data/stack';
import { getStack } from '../../server/functions';

export const Route = createFileRoute('/stack')({
  loader: async () => await getStack(),
  component: Stack,
});

function Stack() {
  const techCategories = Route.useLoaderData() as StackCategory[];

  const dailyDrivers = useMemo(() => {
    const out: StackTech[] = [];
    for (const cat of techCategories) {
      for (const tech of cat.technologies) {
        if (tech.highlight) out.push(tech);
      }
    }
    return out;
  }, [techCategories]);

  return (
    <div className={clsx(styles.page)}>
      <header className={clsx(styles.header)}>
        <p className={clsx(styles.eyebrow)}>Tools & technologies</p>
        <h1 className={clsx(styles.title)}>Tech stack</h1>
        <p className={clsx(styles.subtitle)}>
          What I reach for when building products—languages, frameworks, and tools that ship.
        </p>
      </header>

      {dailyDrivers.length > 0 && (
        <section className={clsx(styles.dailyDrivers)} aria-label="Daily drivers">
          <h2 className={clsx(styles.dailyDriversTitle)}>Daily drivers</h2>
          <p className={clsx(styles.dailyDriversDesc)}>
            The core set I use most often.
          </p>
          <div className={clsx(styles.dailyDriversList)}>
            {dailyDrivers.map((tech, idx) => (
              <div
                key={tech.name}
                className={clsx(styles.driverPill)}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <span className={clsx(styles.driverPillName)}>{tech.name}</span>
                {tech.description && (
                  <span className={clsx(styles.driverPillDesc)}>{tech.description}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className={clsx(styles.sections)}>
        {techCategories.map((cat, idx) => (
          <section
            key={cat.category}
            className={clsx(styles.section)}
            style={{ animationDelay: `${(dailyDrivers.length ? 0.2 : 0) + idx * 0.08}s` }}
          >
            <h2 className={clsx(styles.sectionTitle)}>{cat.category}</h2>
            <div className={clsx(styles.grid)}>
              {cat.technologies.map((tech, techIdx) => (
                <div
                  key={tech.name}
                  className={clsx(styles.item, tech.highlight && styles.itemHighlight)}
                  style={{ animationDelay: `${techIdx * 0.03}s` }}
                  tabIndex={0}
                  role="article"
                  aria-label={tech.description ? `${tech.name}: ${tech.description}` : tech.name}
                >
                  <span className={clsx(styles.itemName)}>{tech.name}</span>
                  {tech.description && (
                    <span className={clsx(styles.itemDesc)}>{tech.description}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
