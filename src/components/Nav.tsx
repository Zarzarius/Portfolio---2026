import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { useCurrentLocale } from '../i18n/useLocale';
import { useMessages } from '../i18n/useMessages';

type NavLinkItem = {
  to: '/$locale' | '/$locale/projects' | '/$locale/about' | '/$locale/contact';
  label: string;
  exact?: boolean;
};

export interface NavProps {
  linkClassName: string;
  activeClassName: string;
  onNavigate?: () => void;
}

export function Nav({ linkClassName, activeClassName, onNavigate }: NavProps) {
  const locale = useCurrentLocale();
  const t = useMessages();

  const navLinks: NavLinkItem[] = [
    { to: '/$locale', label: t.nav.home, exact: true },
    { to: '/$locale/projects', label: t.nav.projects },
    { to: '/$locale/about', label: t.nav.about },
    { to: '/$locale/contact', label: t.nav.contact },
  ];

  return (
    <>
      {navLinks.map(({ to, label, exact }) => (
        <Link
          key={to}
          to={to}
          params={{ locale }}
          className={linkClassName}
          activeOptions={{ exact }}
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
