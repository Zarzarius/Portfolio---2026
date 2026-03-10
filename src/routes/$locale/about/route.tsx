import { createFileRoute } from '@tanstack/react-router';
import classNames from 'classnames/bind';
import { getProfile } from '@/data/profile';
import { getDefaultSeoMeta } from '@/data/seo';
import { normalizeLocale } from '@/i18n';
import { useMessages } from '@/i18n/useMessages';
import styles from '../../about/about.module.scss';

const cx = classNames.bind(styles);

export const Route = createFileRoute('/$locale/about')({
  head: ({ params }) => {
    const seo = getDefaultSeoMeta({
      locale: params.locale,
      path: `/${params.locale}/about`,
      pathnameWithoutLocale: '/about',
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
    <div className={cx('page')}>
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
    </div>
  );
}
