/**
 * Icon: Checkmark
 * Design type: IBM Carbon icon — "checkmark--filled", 16x16 grid
 * Usage: success/finished state on inline loading and status indicators
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function CheckmarkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-3.3 7.1 1.1-1.1L7 8.7l3.2-3.2 1.1 1.1L7 10.9 4.7 8.1Z"
      />
    </svg>
  );
}
