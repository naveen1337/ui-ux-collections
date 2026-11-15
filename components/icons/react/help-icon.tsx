/**
 * Icon: Help (question mark)
 * Design type: IBM Carbon UI icon — circled question mark, 32x32 grid
 * Usage: opens help/support resources from the navbar
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function HelpIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="16" r="12" />
      <path d="M12.5 12.5a3.5 3.5 0 1 1 5 3.2c-1 .5-1.5 1.1-1.5 2.3" />
      <circle cx="16" cy="21.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
