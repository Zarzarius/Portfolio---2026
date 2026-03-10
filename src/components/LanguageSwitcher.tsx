import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { SUPPORTED_LOCALES, getLanguageName, type Locale } from '@/i18n';
import { useCurrentLocale, usePathWithoutLocale } from '@/i18n/useLocale';
import { useMessages } from '@/i18n/useMessages';
import styles from './LanguageSwitcher.module.scss';

const cx = classNames.bind(styles);

const LOCALE_FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  de: '🇩🇪',
};

function getLocaleLabel(locale: Locale): string {
  return locale.toUpperCase();
}

export function LanguageSwitcher() {
  const locale = useCurrentLocale();
  const pathname = usePathWithoutLocale();
  const t = useMessages();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', onPointerDown);
    return () => window.removeEventListener('mousedown', onPointerDown);
  }, []);

  const handleLocaleChange = (nextLocale: Locale) => {
    const normalizedPath = pathname === '/' ? '' : pathname;
    const nextPath = `/${nextLocale}${normalizedPath}`;
    setOpen(false);
    window.location.assign(nextPath);
  };

  return (
    <div ref={rootRef} className={cx('switcher')}>
      <button
        type="button"
        className={cx('trigger')}
        aria-label={t.common.languageLabel}
        title={getLanguageName(locale)}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cx('localeLabel')} aria-hidden>
          <span className={cx('flag')}>{LOCALE_FLAGS[locale]}</span>
          <span className={cx('code')}>{getLocaleLabel(locale)}</span>
        </span>
      </button>

      <div
        role="menu"
        className={cx('menu', open && 'menuOpen')}
        aria-hidden={!open}
      >
        {SUPPORTED_LOCALES.map((nextLocale) => (
          <button
            key={nextLocale}
            type="button"
            role="menuitemradio"
            title={getLanguageName(nextLocale)}
            aria-checked={nextLocale === locale}
            className={cx('option', nextLocale === locale && 'optionActive')}
            onClick={() => handleLocaleChange(nextLocale)}
          >
            <span className={cx('localeLabel')} aria-hidden>
              <span className={cx('flag')}>{LOCALE_FLAGS[nextLocale]}</span>
              <span className={cx('code')}>{getLocaleLabel(nextLocale)}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

