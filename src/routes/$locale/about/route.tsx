import { createFileRoute } from '@tanstack/react-router';
import classNames from 'classnames/bind';
import { getProfile } from '@/data/profile';
import { getDefaultSeoMeta } from '@/data/seo';
import { getMessages, normalizeLocale } from '@/i18n';
import { useMessages } from '@/i18n/useMessages';
import type { CSSProperties } from 'react';
import { getCardImageUrl } from '@/components/ProjectCard/projectCardItems';
import styles from '../../about/about.module.scss';

const cx = classNames.bind(styles);

const PHOTO_ROTATIONS = [-3, 2, -4, 3, 5, -2, 4, -3, 2, -2, 3, -5, 2, -3, 4, -2];
const PHOTO_SIZES = [
  'tall', 'lg', 'sm', 'sm', 'md', 'md', 'sm', 'sm',
  'lg', 'sm', 'tall', 'sm', 'md', 'md', 'sm', 'sm',
];

export const Route = createFileRoute('/$locale/about')({
  head: ({ params }) => {
    const locale = normalizeLocale(params.locale);
    const t = getMessages(locale);
    const seo = getDefaultSeoMeta({
      locale,
      path: `/${locale}/about`,
      pathnameWithoutLocale: '/about',
      title: t.seo.aboutTitle,
      description: t.seo.aboutDescription,
      kind: 'about',
    });
    return { meta: seo.meta, links: seo.links, scripts: seo.scripts };
  },
  component: About,
});

function About() {
  const { locale } = Route.useParams();
  const t = useMessages();
  const profile = getProfile(normalizeLocale(locale));

  return (
    <div className={cx('page')} data-stagger>
      <header className={cx('header')}>
        <p className={cx('eyebrow')}>{t.about.eyebrow}</p>
        <h1 className={cx('title')}>{t.about.title}</h1>
        <p className={cx('subtitle')}>{profile.summary}</p>
      </header>

      <div className={cx('content')}>
        <h2 className={cx('sectionTitle')}>{t.about.languagesTitle}</h2>
        <p className={cx('paragraph')}>{t.about.languagesText}</p>

        <h2 className={cx('sectionTitle')}>{t.about.beyondWorkTitle}</h2>
        <p className={cx('paragraph')}>{t.about.beyondWorkText}</p>
      </div>

      <ul className={cx('collage')} aria-label={t.about.galleryLabel}>
        {t.about.photos.map((alt, i) => (
          <li
            key={alt}
            className={cx('photo', PHOTO_SIZES[i % PHOTO_SIZES.length])}
            style={{ '--rotate': `${PHOTO_ROTATIONS[i % PHOTO_ROTATIONS.length]}deg` } as CSSProperties}
          >
            <img
              src={getCardImageUrl({ id: `about-${i + 1}`, image: `About/${i + 1}.avif` })}
              alt={alt}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
