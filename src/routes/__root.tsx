import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { PageTransition } from '../components/PageTransition';
import styles from './__root.module.scss';

export const Route = createRootRoute({
  component: () => (
    <>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logoSection}>
            <span className={styles.logoIcon}></span>
            <Link to="/" className={styles.logo}>
              DEV_ARCH // V2.0
            </Link>
          </div>
          <nav className={styles.navLinks}>
            <Link
              to="/"
              className={styles.navLink}
              activeProps={{ className: `${styles.navLink} ${styles.active}` }}
            >
              01. WORKS
            </Link>
            <Link
              to="/stack"
              className={styles.navLink}
              activeProps={{ className: `${styles.navLink} ${styles.active}` }}
            >
              02. STACK
            </Link>
            <Link
              to="/logs"
              className={styles.navLink}
              activeProps={{ className: `${styles.navLink} ${styles.active}` }}
            >
              03. LOGS
            </Link>
            <Link
              to="/signal"
              className={styles.navLink}
              activeProps={{ className: `${styles.navLink} ${styles.active}` }}
            >
              04. SIGNAL
            </Link>
          </nav>
          <div className={styles.headerRight}>
            <button className={styles.resumeButton}>
              <span>INITIALIZE RESUME</span>
            </button>
            <div className={styles.profileImage}>AAC</div>
          </div>
        </div>
        <div className={styles.statusBar}>* SYSTEM_STATUS: ONLINE</div>
      </header>
      <main className={styles.main}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          © 2026 ACADEMY_ARCH. ALL_RIGHTS_RESERVED.
        </div>
        <div className={styles.footerCenter}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            LINKEDIN
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            TWITTER_X
          </a>
        </div>
        <div className={styles.footerRight}>
          * AT:{' '}
          {new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
          })}{' '}
          |{' '}
          {new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          | 74.000^
        </div>
      </footer>
    </>
  ),
});
