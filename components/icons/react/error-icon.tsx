/**
 * Icon: Error
 * Design type: IBM Carbon icon — "error--filled", 16x16 grid
 * Usage: error state on inline loading and status indicators
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function ErrorIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm3.3 9.5-.8.8L8 8.8l-2.5 2.5-.8-.8L7.2 8 4.7 5.5l.8-.8L8 7.2l2.5-2.5.8.8L8.8 8l2.5 2.5Z"
      />
    </svg>
  );
}
