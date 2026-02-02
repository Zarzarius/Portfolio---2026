import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { PageTransition } from '../components/PageTransition';
import { SystemTime } from '../components/SystemTime';
import styles from './__root.module.scss';
import '../index.scss';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'AZAEL AC // DEV' },
    ],    
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <header className={clsx(styles.header)}>
        <div className={clsx(styles.headerTop)}>
          <div className={clsx(styles.logoSection)}>
            <span className={clsx(styles.logoIcon)}></span>
            <Link to="/" className={clsx(styles.logo)}>
              AZAEL AC // DEV
            </Link>
          </div>
          <nav className={clsx(styles.navLinks)}>
            <Link
              to="/"
              className={clsx(styles.navLink)}
              activeProps={{ className: clsx(styles.navLink, styles.active) }}
            >
              01. WORKS
            </Link>
            <Link
              to="/stack"
              className={clsx(styles.navLink)}
              activeProps={{ className: clsx(styles.navLink, styles.active) }}
            >
              02. STACK
            </Link>
            <Link
              to="/logs"
              className={clsx(styles.navLink)}
              activeProps={{ className: clsx(styles.navLink, styles.active) }}
            >
              03. LOGS
            </Link>
            <Link
              to="/signal"
              className={clsx(styles.navLink)}
              activeProps={{ className: clsx(styles.navLink, styles.active) }}
            >
              04. SIGNAL
            </Link>
          </nav>
          <div className={clsx(styles.headerRight)}>
            <button className={clsx(styles.resumeButton)}>
              <span>INITIALIZE RESUME</span>
            </button>
            <div className={clsx(styles.profileImage)}>AAC</div>
          </div>
        </div>
        <div className={clsx(styles.statusBar)}>* SYSTEM_STATUS: ONLINE</div>
      </header>
      <main className={clsx(styles.main)}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <footer className={clsx(styles.footer)}>
        <div className={clsx(styles.footerLeft)}>
          © 2026 ACADEMY_ARCH. ALL_RIGHTS_RESERVED.
        </div>
        <div className={clsx(styles.footerCenter)}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.footerLink)}
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.footerLink)}
          >
            LINKEDIN
          </a>
        </div>
        <div className={clsx(styles.footerRight)}>
          <SystemTime />
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
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
