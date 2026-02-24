import clsx from 'clsx';
import { useMemo } from 'react';
import type { StackCategory, StackTech } from '../data/stack';
import styles from './StackSection.module.scss';

interface StackSectionProps {
  techCategories: StackCategory[];
}

export function StackSection({ techCategories }: StackSectionProps) {
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
    <section className={clsx(styles.stackSection)} aria-labelledby="stack-heading">
      <header className={clsx(styles.stackHeader)}>
        <p className={clsx(styles.stackEyebrow)}>Tools & technologies</p>
        <h2 id="stack-heading" className={clsx(styles.stackTitle)}>
          Tech stack
        </h2>
        <p className={clsx(styles.stackSubtitle)}>
          What I reach for when building products—languages, frameworks, and
          tools that ship.
        </p>
      </header>

      {dailyDrivers.length > 0 && (
        <div className={clsx(styles.dailyDrivers)} aria-label="Daily drivers">
          <h3 className={clsx(styles.dailyDriversTitle)}>Daily drivers</h3>
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
                  <span className={clsx(styles.driverPillDesc)}>
                    {tech.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={clsx(styles.sections)}>
        {techCategories.map((cat, idx) => (
          <section
            key={cat.category}
            className={clsx(styles.section)}
            style={{
              animationDelay: `${(dailyDrivers.length ? 0.2 : 0) + idx * 0.08}s`,
            }}
          >
            <h3 className={clsx(styles.sectionTitle)}>{cat.category}</h3>
            <div className={clsx(styles.grid)}>
              {cat.technologies.map((tech, techIdx) => (
                <div
                  key={tech.name}
                  className={clsx(
                    styles.item,
                    tech.highlight && styles.itemHighlight,
                  )}
                  style={{ animationDelay: `${techIdx * 0.03}s` }}
                  tabIndex={0}
                  role="article"
                  aria-label={
                    tech.description
                      ? `${tech.name}: ${tech.description}`
                      : tech.name
                  }
                >
                  <span className={clsx(styles.itemName)}>{tech.name}</span>
                  {tech.description && (
                    <span className={clsx(styles.itemDesc)}>
                      {tech.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
