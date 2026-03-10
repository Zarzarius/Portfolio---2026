export type ArrowIconDirection = 'left' | 'right';

interface ArrowIconProps {
  direction?: ArrowIconDirection;
  size?: number;
  className?: string;
}

export function ArrowIcon({
  direction = 'left',
  size = 16,
  className,
}: ArrowIconProps) {
  const isRight = direction === 'right';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      style={{ transform: isRight ? 'scaleX(-1)' : undefined }}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
