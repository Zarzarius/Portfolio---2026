import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import styles from './BurgerMenu.module.scss';

type BurgerMenuProps = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: ReactNode;
};

export function BurgerMenu({ open, onToggle, onClose, children }: BurgerMenuProps) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const overlay = (
    <div
      id="mobile-menu"
      className={clsx(styles.overlay, open && styles.overlayOpen)}
      aria-hidden={!open}
      onClick={onClose}
    >
      <nav
        className={clsx(styles.drawer, open && styles.drawerOpen)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </nav>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={clsx(styles.burger, open && styles.burgerOpen)}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>
      {typeof document !== 'undefined' &&
        createPortal(overlay, document.body)}
    </>
  );
}
