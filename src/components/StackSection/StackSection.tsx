import classNames from 'classnames/bind';
import type { StackCategory } from '@/data/stack';
import { useMessages } from '@/i18n/useMessages';
import styles from './StackSection.module.scss';

const cx = classNames.bind(styles);

interface StackSectionProps {
  techCategories: StackCategory[];
}

const pad = (n: number) => String(n).padStart(2, '0');

function handleCardPointerMove(e: React.PointerEvent<HTMLLIElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
}

export function StackSection({ techCategories }: StackSectionProps) {
  const t = useMessages();
  const total = pad(techCategories.length);

  return (
    <section
      className={cx('stackSection')}
      aria-labelledby="stack-heading"
      data-reveal
    >
      <header className={cx('stackHeader')}>
        <p className={cx('stackEyebrow')}>{t.stack.eyebrow}</p>
        <h2 id="stack-heading" className={cx('stackTitle')}>
          {t.stack.title}
        </h2>
        <p className={cx('stackSubtitle')}>{t.stack.subtitle}</p>
      </header>

      <ul className={cx('grid')}>
        {techCategories.map((cat, i) => {
          const core = cat.technologies.filter((tech) => tech.highlight);
          const rest = cat.technologies.filter((tech) => !tech.highlight);

          return (
            <li
              key={cat.category}
              className={cx('card')}
              onPointerMove={handleCardPointerMove}
            >
              <header className={cx('cardHeader')}>
                <h3 className={cx('cardTitle')}>{cat.category}</h3>
                <span className={cx('cardIndex')} aria-hidden>
                  {pad(i + 1)} / {total}
                </span>
              </header>

              {core.length > 0 && (
                <div className={cx('group')}>
                  <p className={cx('groupLabel')}>{t.stack.core}</p>
                  <ul className={cx('coreList')}>
                    {core.map((tech) => (
                      <li key={tech.name} className={cx('coreItem')}>
                        <span className={cx('coreName')}>{tech.name}</span>
                        {tech.description && (
                          <span className={cx('coreDesc')}>
                            {tech.description}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {rest.length > 0 && (
                <div className={cx('group')}>
                  <p className={cx('groupLabel')}>{t.stack.more}</p>
                  <ul className={cx('tagList')}>
                    {rest.map((tech) => (
                      <li
                        key={tech.name}
                        className={cx('tag')}
                        title={tech.description}
                      >
                        {tech.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
