import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { useCurrentLocale } from '../i18n/useLocale';
import { useMessages } from '../i18n/useMessages';

export interface NavProps {
  linkClassName: string;
  activeClassName: string;
  onNavigate?: () => void;
}

export function Nav({
  linkClassName,
  activeClassName,
  onNavigate,
}: NavProps) {
  const locale = useCurrentLocale();
  const t = useMessages();

  const navLinks = [
    { to: '/$locale', label: t.nav.home },
    { to: '/$locale/projects', label: t.nav.projects },
    { to: '/$locale/about', label: t.nav.about },
    { to: '/$locale/contact', label: t.nav.contact },
  ] as const;

  return (
    <>
      {navLinks.map(({ to, label }) => (
        <Link
          key={to}
          to={to as '/$locale' | '/$locale/projects' | '/$locale/about' | '/$locale/contact'}
          params={{ locale }}
          className={linkClassName}
          activeProps={{
            className: clsx(linkClassName, activeClassName),
          }}
          preload="intent"
          onClick={onNavigate}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
