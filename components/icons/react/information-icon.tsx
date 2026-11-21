/**
 * Icon: Information
 * Design type: IBM Carbon icon — "information--filled", 16x16 grid
 * Usage: informational status on notifications and status indicators
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function InformationIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm1 11H7V7h2v5ZM8 5.5a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z"
      />
    </svg>
  );
}
