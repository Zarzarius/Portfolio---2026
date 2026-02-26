import { useState } from 'react';
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { BurgerMenu } from '../components/BurgerMenu';
import { Button } from '../components/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Nav } from '../components/Nav';
import { PageTransition } from '../components/PageTransition';
import { ThemeToggle } from '../components/ThemeToggle';
import { getProfile } from '../data/profile';
import { getDefaultSeoMeta } from '../data/seo';
import { DEFAULT_LOCALE } from '../i18n';
import { useCurrentLocale } from '../i18n/useLocale';
import { useMessages } from '../i18n/useMessages';
import styles from './__root.module.scss';
import '../index.scss';

const defaultSeo = getDefaultSeoMeta({ locale: DEFAULT_LOCALE, path: '/en' });

function NotFoundComponent() {
  const t = useMessages();
  const locale = useCurrentLocale();

  return (
    <div className={clsx(styles.notFound)}>
      <p className={clsx(styles.notFoundCode)}>404</p>
      <h1 className={clsx(styles.notFoundTitle)}>{t.common.notFoundTitle}</h1>
      <p className={clsx(styles.notFoundText)}>{t.common.notFoundText}</p>
      <Button to="/$locale" params={{ locale }} variant="primary" preload="intent">
        {t.common.backToHome}
      </Button>
    </div>
  );
}

function RootPendingComponent() {
  const t = useMessages();

  return (
    <div
      className={clsx(styles.pendingWrap)}
      aria-live="polite"
      aria-busy="true"
    >
      <span className={clsx(styles.pendingLabel)}>{t.common.loading}</span>
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
      <header className={clsx(styles.header)}>
        <div className={clsx(styles.headerInner)}>
          <Link
            to="/$locale"
            params={{ locale }}
            className={clsx(styles.logo)}
            preload="intent"
          >
            {profile.shortName}
          </Link>
          <nav className={clsx(styles.nav)} aria-label={t.nav.mainAriaLabel}>
            <Nav
              linkClassName={clsx(styles.navLink)}
              activeClassName={styles.active}
            />
          </nav>
          <div className={clsx(styles.headerActions)}>
            <ThemeToggle />
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
          </div>
          <BurgerMenu
            open={menuOpen}
            onToggle={() => setMenuOpen((o) => !o)}
            onClose={closeMenu}
          >
            <div className={styles.mobileNav}>
              <Nav
                linkClassName={styles.mobileNavLink}
                activeClassName={styles.mobileNavLinkActive}
                onNavigate={closeMenu}
              />
            </div>
            <div className={styles.mobileActions}>
              <div className={styles.mobileIconActions}>
                <ThemeToggle />
                <LanguageSwitcher />
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
      <main id="main" className={clsx(styles.main)}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <footer className={clsx(styles.footer)}>
        <div className={clsx(styles.footerAccent)} aria-hidden />
        <div className={clsx(styles.footerInner)}>
          <div className={clsx(styles.footerBrand)}>
            <span className={clsx(styles.footerCopy)}>© 2026</span>
            <span className={clsx(styles.footerName)}>{profile.fullName}</span>
            <span className={clsx(styles.footerTagline)}>
              {profile.tagline}
            </span>
          </div>
          <nav className={clsx(styles.footerConnect)} aria-label="Connect">
            <span className={clsx(styles.footerConnectLabel)}>{t.common.connect}</span>
            <div className={clsx(styles.footerLinks)}>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(styles.footerLink)}
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={styles.footerLinkIcon}
                  aria-hidden
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href={
                  profile.social.linkedin.startsWith('http')
                    ? profile.social.linkedin
                    : `https://${profile.social.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(styles.footerLink)}
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={styles.footerLinkIcon}
                  aria-hidden
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
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
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document;var s=localStorage.getItem('theme');var p=typeof window!=='undefined'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches;var t=s==='dark'||s==='light'?s:(p?'dark':'light');d.documentElement.setAttribute('data-theme',t);})();`,
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
      <body className={styles.body}>
        <a href="#main" className={styles.skipLink}>
          {t.common.skipToMain}
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
