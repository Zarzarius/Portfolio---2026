import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';
import styles from './stack.module.scss';

import { getStack } from '../../server/functions';

export const Route = createFileRoute('/stack')({
  loader: async () => await getStack(),
  component: Stack,
});

function Stack() {
  const techCategories = Route.useLoaderData();
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.header)}>
        <div className={clsx(styles.titlePrefix)}>02//</div>
        <h1 className={clsx(styles.title)}>TECH_STACK</h1>
        <div className={clsx(styles.commandLine)}>
          &gt; cat tech_stack.txt --format=terminal
        </div>
      </div>

      <div className={clsx(styles.categories)}>
        {techCategories.map((cat, idx) => (
          <div key={idx} className={clsx(styles.category)}>
            <h2 className={clsx(styles.categoryTitle)}>{cat.category}</h2>
            <div className={clsx(styles.techGrid)}>
              {cat.technologies.map((tech, techIdx) => (
                <div key={techIdx} className={clsx(styles.techCard)}>
                  {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
