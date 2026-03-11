import classNames from 'classnames/bind';
import type { StackCategory, StackTech } from '@/data/stack';
import { useMessages } from '@/i18n/useMessages';
import styles from './StackSection.module.scss';

const cx = classNames.bind(styles);

interface StackSectionProps {
  techCategories: StackCategory[];
}

export function StackSection({ techCategories }: StackSectionProps) {
  const t = useMessages();

  return (
    <section className={cx('stackSection')} aria-labelledby="stack-heading">
      <header className={cx('stackHeader')}>
        <p className={cx('stackEyebrow')}>{t.stack.eyebrow}</p>
        <h2 id="stack-heading" className={cx('stackTitle')}>
          {t.stack.title}
        </h2>
        <p className={cx('stackSubtitle')}>
          {t.stack.subtitle}
        </p>
      </header>

      <div className={cx('categoryList')}>
        {techCategories.map((cat) => (
          <div key={cat.category} className={cx('categoryRow')}>
            <span className={cx('categoryLabel')}>{cat.category}</span>
            <ul className={cx('tagList')} aria-label={cat.category}>
              {cat.technologies.map((tech: StackTech) => (
                <li key={tech.name}>
                  <span
                    className={cx('tag', tech.highlight && 'tagHighlight')}
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
