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
import { PageTransition } from '../components/PageTransition';
import { ThemeToggle } from '../components/ThemeToggle';
import { profile } from '../data/profile';
import { getDefaultSeoMeta } from '../data/seo';
import styles from './__root.module.scss';
import '../index.scss';

const defaultSeo = getDefaultSeoMeta();

function NotFoundComponent() {
  return (
    <div className={clsx(styles.notFound)}>
      <p className={clsx(styles.notFoundCode)}>404</p>
      <h1 className={clsx(styles.notFoundTitle)}>Page not found</h1>
      <p className={clsx(styles.notFoundText)}>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className={clsx(styles.notFoundLink)} preload="intent">
        Back to home
      </Link>
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
});

function RootComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <RootDocument>
      <header className={clsx(styles.header)}>
        <div className={clsx(styles.headerInner)}>
          <Link to="/" className={clsx(styles.logo)} preload="intent">
            {profile.shortName}
          </Link>
          <nav className={clsx(styles.nav)} aria-label="Main">
            <Link
              to="/"
              className={clsx(styles.navLink)}
              activeProps={{ className: clsx(styles.navLink, styles.active) }}
              preload="intent"
            >
              Portfolio
            </Link>
            <Link
              to="/projects"
              className={clsx(styles.navLink)}
              activeProps={{ className: clsx(styles.navLink, styles.active) }}
              preload="intent"
            >
              Projects
            </Link>
            <Link
              to="/stack"
              className={clsx(styles.navLink)}
              activeProps={{ className: clsx(styles.navLink, styles.active) }}
              preload="intent"
            >
              Stack
            </Link>
            <Link
              to="/about"
              className={clsx(styles.navLink)}
              activeProps={{ className: clsx(styles.navLink, styles.active) }}
              preload="intent"
            >
              About
            </Link>
            <Link
              to="/contact"
              className={clsx(styles.navLink)}
              activeProps={{ className: clsx(styles.navLink, styles.active) }}
              preload="intent"
            >
              Contact
            </Link>
          </nav>
          <div className={clsx(styles.headerActions)}>
            <ThemeToggle />
            <a
              href={profile.resumeUrl}
              className={clsx(styles.resumeButton)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
          <BurgerMenu
            open={menuOpen}
            onToggle={() => setMenuOpen((o) => !o)}
            onClose={closeMenu}
          >
            <div className={styles.mobileNav}>
              <Link
                to="/"
                className={styles.mobileNavLink}
                activeProps={{
                  className: clsx(
                    styles.mobileNavLink,
                    styles.mobileNavLinkActive,
                  ),
                }}
                preload="intent"
                onClick={closeMenu}
              >
                Work
              </Link>
              <Link
                to="/projects"
                className={styles.mobileNavLink}
                activeProps={{
                  className: clsx(
                    styles.mobileNavLink,
                    styles.mobileNavLinkActive,
                  ),
                }}
                preload="intent"
                onClick={closeMenu}
              >
                Projects
              </Link>
              <Link
                to="/stack"
                className={styles.mobileNavLink}
                activeProps={{
                  className: clsx(
                    styles.mobileNavLink,
                    styles.mobileNavLinkActive,
                  ),
                }}
                preload="intent"
                onClick={closeMenu}
              >
                Stack
              </Link>
              <Link
                to="/about"
                className={styles.mobileNavLink}
                activeProps={{
                  className: clsx(
                    styles.mobileNavLink,
                    styles.mobileNavLinkActive,
                  ),
                }}
                preload="intent"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={styles.mobileNavLink}
                activeProps={{
                  className: clsx(
                    styles.mobileNavLink,
                    styles.mobileNavLinkActive,
                  ),
                }}
                preload="intent"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </div>
            <div className={styles.mobileActions}>
              <ThemeToggle />
              <a
                href={profile.resumeUrl}
                className={styles.mobileResumeButton}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Resume
              </a>
            </div>
          </BurgerMenu>
        </div>
      </header>
      <main className={clsx(styles.main)}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <footer className={clsx(styles.footer)}>
        <div className={clsx(styles.footerInner)}>
          <span className={clsx(styles.footerCopy)}>
            © 2026 {profile.fullName}
          </span>
          <div className={clsx(styles.footerLinks)}>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(styles.footerLink)}
            >
              GitHub
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(styles.footerLink)}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
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
        {children}
        <Scripts />
      </body>
    </html>
  );
}
