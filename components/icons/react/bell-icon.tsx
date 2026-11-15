/**
 * Icon: Bell (notifications)
 * Design type: IBM Carbon UI icon — outlined bell, 32x32 grid
 * Usage: opens the notification panel from the navbar
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function BellIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 4a7 7 0 0 0-7 7v6.5L6 21v1h20v-1l-3-3.5V11a7 7 0 0 0-7-7z" />
      <path d="M13 24a3 3 0 0 0 6 0" />
    </svg>
  );
}
