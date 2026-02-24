import { Link } from '@tanstack/react-router';
import clsx from 'clsx';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

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
  return (
    <>
      {NAV_LINKS.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
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
