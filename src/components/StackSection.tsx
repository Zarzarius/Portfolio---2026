import clsx from 'clsx';
import type { StackCategory, StackTech } from '../data/stack';
import { useMessages } from '../i18n/useMessages';
import styles from './StackSection.module.scss';

interface StackSectionProps {
  techCategories: StackCategory[];
}

export function StackSection({ techCategories }: StackSectionProps) {
  const t = useMessages();

  return (
    <section className={clsx(styles.stackSection)} aria-labelledby="stack-heading">
      <header className={clsx(styles.stackHeader)}>
        <p className={clsx(styles.stackEyebrow)}>{t.stack.eyebrow}</p>
        <h2 id="stack-heading" className={clsx(styles.stackTitle)}>
          {t.stack.title}
        </h2>
        <p className={clsx(styles.stackSubtitle)}>
          {t.stack.subtitle}
        </p>
      </header>

      <div className={clsx(styles.categoryList)}>
        {techCategories.map((cat) => (
          <div key={cat.category} className={clsx(styles.categoryRow)}>
            <span className={clsx(styles.categoryLabel)}>{cat.category}</span>
            <ul className={clsx(styles.tagList)} aria-label={cat.category}>
              {cat.technologies.map((tech: StackTech) => (
                <li key={tech.name}>
                  <span
                    className={clsx(
                      styles.tag,
                      tech.highlight && styles.tagHighlight,
                    )}
                    title={tech.description ?? tech.name}
                  >
                    {tech.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
