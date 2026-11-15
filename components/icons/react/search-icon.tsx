/**
 * Icon: Search
 * Design type: IBM Carbon UI icon — magnifying glass, 32x32 grid
 * Usage: search inputs and filters
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="14" cy="14" r="8" />
      <path d="M20 20l8 8" />
    </svg>
  );
}
