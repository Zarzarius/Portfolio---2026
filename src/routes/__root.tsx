import { useState } from 'react';
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import classNames from 'classnames/bind';
import { BurgerMenu } from '@/components/BurgerMenu';
import { Button } from '@/components/Button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Nav } from '@/components/Nav';
import { SocialLinks } from '@/components/SocialLinks';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getProfile } from '@/data/profile';
import { getDefaultSeoMeta } from '@/data/seo';
import { DEFAULT_LOCALE } from '@/i18n';
import { useCurrentLocale } from '@/i18n/useLocale';
import { useMessages } from '@/i18n/useMessages';
import styles from './__root.module.scss';
import '../index.scss';

const cx = classNames.bind(styles);

const defaultSeo = getDefaultSeoMeta({ locale: DEFAULT_LOCALE, path: '/en' });

function NotFoundComponent() {
  const t = useMessages();
  const locale = useCurrentLocale();

  return (
    <div className={cx('notFound')}>
      <p className={cx('notFoundCode')}>404</p>
      <h1 className={cx('notFoundTitle')}>{t.common.notFoundTitle}</h1>
      <p className={cx('notFoundText')}>{t.common.notFoundText}</p>
      <Button
        to="/$locale"
        params={{ locale }}
        variant="primary"
        preload="intent"
      >
        {t.common.backToHome}
      </Button>
    </div>
  );
}

function RootPendingComponent() {
  const t = useMessages();

  return (
    <div className={cx('pendingWrap')} aria-live="polite" aria-busy="true">
      <span className={cx('pendingLabel')}>{t.common.loading}</span>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...defaultSeo.meta,
    ],
    links: defaultSeo.links,
    scripts: defaultSeo.scripts,
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  pendingComponent: RootPendingComponent,
});

function RootComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const locale = useCurrentLocale();
  const t = useMessages();
  const profile = getProfile(locale);

  return (
    <RootDocument>
      <header className={cx('header')}>
        <div className={cx('headerInner')}>
          <Link
            to="/$locale"
            params={{ locale }}
            className={cx('logo')}
            preload="intent"
          >
            {profile.shortName}
          </Link>
          <nav className={cx('nav')} aria-label={t.nav.mainAriaLabel}>
            <Nav linkClassName={cx('navLink')} activeClassName={cx('active')} />
          </nav>
          <div className={cx('headerActions')}>
            <Button
              href={profile.resumeUrl}
              variant="primary"
              size="compact"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.common.resume}
            </Button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <BurgerMenu
            open={menuOpen}
            onToggle={() => setMenuOpen((o) => !o)}
            onClose={closeMenu}
          >
            <div className={cx('mobileNav')}>
              <Nav
                linkClassName={cx('mobileNavLink')}
                activeClassName={cx('mobileNavLinkActive')}
                onNavigate={closeMenu}
              />
            </div>
            <div className={cx('mobileActions')}>
              <div className={cx('mobileIconActions')}>
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <Button
                href={profile.resumeUrl}
                variant="primary"
                size="compact"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                {t.common.resume}
              </Button>
            </div>
          </BurgerMenu>
        </div>
      </header>
      <main id="main" className={cx('main')}>
        <Outlet />
      </main>
      <footer className={cx('footer')}>
        <div className={cx('footerAccent')} aria-hidden />
        <div className={cx('footerInner')}>
          <div className={cx('footerBrand')}>
            <span className={cx('footerCopy')}>© 2026</span>
            <span className={cx('footerName')}>{profile.fullName}</span>
            <span className={cx('footerTagline')}>{profile.tagline}</span>
          </div>
          <nav className={cx('footerConnect')} aria-label="Connect">
            <span className={cx('footerConnectLabel')}>{t.common.connect}</span>
            <SocialLinks
              githubUrl={profile.social.github}
              linkedinUrl={profile.social.linkedin}
              className={cx('footerLinks')}
              linkClassName={cx('footerLink')}
              iconClassName={cx('footerLinkIcon')}
            />
          </nav>
        </div>
      </footer>
    </RootDocument>
  );
}

// Avoid beforeunload/unload listeners and Cache-Control: no-store so back/forward cache (bfcache) can speed up return navigations.
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const locale = useCurrentLocale();
  const t = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#d6d3d1" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document;var s=localStorage.getItem('theme');var h=d.documentElement;var p=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var e=s==='dark'||s==='light';var t=e?s:(p?'dark':'light');if(e)h.setAttribute('data-theme',t);var m=d.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?'#020617':'#d6d3d1');}catch(_){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700&family=Sora:wght@400;500;600;700&display=swap"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{font-family:'Plus Jakarta Sans',system-ui,sans-serif;line-height:1.5;font-weight:400;font-synthesis:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}body{margin:0;min-width:320px;min-height:100vh}[data-theme="dark"]{color-scheme:dark}`,
          }}
        />
        <HeadContent />
      </head>
      <body className={cx('body')} suppressHydrationWarning>
        <a href="#main" className={cx('skipLink')}>
          {t.common.skipToMain}
        </a>
        {children}
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}
