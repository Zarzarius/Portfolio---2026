import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

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
    className={cx('icon')}
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
  loadingText?: string;
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
  params?: Record<string, string>;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

function getVariantKey(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return 'primary';
    case 'outline':
      return 'outline';
    case 'ghost':
      return 'ghost';
    default:
      return 'primary';
  }
}

function getSizeKey(
  variant: ButtonVariant,
  size?: ButtonSize,
): string | null {
  if (variant === 'primary') {
    return size === 'compact' ? 'primaryCompact' : 'primaryDefault';
  }
  if (variant === 'ghost') {
    return 'ghostSquare';
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
    loadingText,
    children,
    icon,
    className,
    ...rest
  } = props;

  const isDisabled = disabled === true || loading === true;
  const variantKey = getVariantKey(variant);
  const sizeKey = getSizeKey(variant, size);
  const resolvedIcon =
    icon ?? (variant === 'primary' && props.href ? RESUME_ICON : null);

  const rootClassName = cx(
    'root',
    variantKey,
    sizeKey,
    active === true && variant === 'outline' && 'outlineActive',
    loading === true && 'loading',
    className,
  );

  const content = (
    <>
      {loading === true ? (loadingText ?? 'Sending…') : children}
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
        className={rootClassName}
        aria-disabled={isDisabled ? true : undefined}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  if (props.to != null) {
    const { to, preload, params, ...linkRest } = rest as ButtonAsLink;
    const linkPreload = preload === 'none' ? false : preload;
    return (
      <Link
        to={to}
        params={params}
        preload={linkPreload}
        className={rootClassName}
        {...linkRest}
      >
        {content}
      </Link>
    );
  }

  const { type = 'button', ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      type={type}
      className={rootClassName}
      disabled={isDisabled}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
