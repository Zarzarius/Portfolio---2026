import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';
import { getProfile } from '@/data/profile';
import { getDefaultSeoMeta } from '../../../data/seo';
import { normalizeLocale } from '../../../i18n';
import { useMessages } from '../../../i18n/useMessages';
import styles from '../../about/about.module.scss';

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
    <div className={clsx(styles.page)}>
      <header className={clsx(styles.header)}>
        <p className={clsx(styles.eyebrow)}>{t.about.eyebrow}</p>
        <h1 className={clsx(styles.title)}>{t.about.title}</h1>
        <p className={clsx(styles.subtitle)}>{profile.summary}</p>
      </header>

      <div className={clsx(styles.content)}>
        <h2 className={clsx(styles.sectionTitle)}>{t.about.languagesTitle}</h2>
        <p className={clsx(styles.paragraph)}>{t.about.languagesText}</p>

        <h2 className={clsx(styles.sectionTitle)}>{t.about.beyondWorkTitle}</h2>
        <p className={clsx(styles.paragraph)}>{t.about.beyondWorkText}</p>
      </div>
    </div>
  );
}
