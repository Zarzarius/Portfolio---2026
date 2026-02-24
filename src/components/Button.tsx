import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

/** Hoisted static JSX: resume/download arrow icon (not recreated every render). */
const RESUME_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.icon}
    aria-hidden
  >
    <path d="M12 15V3" />
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
  </svg>
);

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'default' | 'compact';

export interface ButtonBaseProps {
  variant: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  to?: never;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
}

export interface ButtonAsAnchor extends ButtonBaseProps {
  href: string;
  to?: never;
  type?: never;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface ButtonAsLink extends ButtonBaseProps {
  to: string;
  href?: never;
  type?: never;
  preload?: 'intent' | 'viewport' | 'none';
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

function getVariantClass(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return styles.primary;
    case 'outline':
      return styles.outline;
    case 'ghost':
      return styles.ghost;
    default:
      return styles.primary;
  }
}

function getSizeClass(
  variant: ButtonVariant,
  size?: ButtonSize,
): string | null {
  if (variant === 'primary') {
    return size === 'compact' ? styles.primaryCompact : styles.primaryDefault;
  }
  if (variant === 'ghost') {
    return styles.ghostSquare;
  }
  return null;
}

export function Button(props: ButtonProps) {
  const {
    variant,
    size,
    active,
    disabled,
    loading,
    children,
    icon,
    className,
    ...rest
  } = props;

  const isDisabled = disabled === true || loading === true;
  const variantClass = getVariantClass(variant);
  const sizeClass = getSizeClass(variant, size);
  const resolvedIcon =
    icon ?? (variant === 'primary' && props.href ? RESUME_ICON : null);

  const classNames = clsx(
    styles.root,
    variantClass,
    sizeClass,
    active === true && variant === 'outline' && styles.outlineActive,
    loading === true && styles.loading,
    className,
  );

  const content = (
    <>
      {loading === true ? 'Sending…' : children}
      {loading === true ? null : resolvedIcon}
    </>
  );

  if (props.href != null) {
    const { href, target, rel, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classNames}
        aria-disabled={isDisabled ? true : undefined}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  if (props.to != null) {
    const { to, preload, ...linkRest } = rest as ButtonAsLink;
    const linkPreload = preload === 'none' ? false : preload;
    return (
      <Link to={to} preload={linkPreload} className={classNames} {...linkRest}>
        {content}
      </Link>
    );
  }

  const { type = 'button', ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      type={type}
      className={classNames}
      disabled={isDisabled}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
