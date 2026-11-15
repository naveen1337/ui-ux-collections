/**
 * Icon: Brighten (theme toggle)
 * Design type: IBM Carbon UI icon — sun half over rays, 32x32 grid
 * Usage: switches between light and dark interface themes
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function BrightenIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 4a12 12 0 0 1 0 24V4z" fill="currentColor" stroke="none" />
      <path d="M16 4a12 12 0 0 0 0 24V4z" />
      <path d="M16 2v2M16 28v2M2 16h2M28 16h2M6 6l1.5 1.5M24.5 24.5 26 26M26 6l-1.5 1.5M7.5 24.5 6 26" />
    </svg>
  );
}
