/**
 * Icon: Panel
 * Design type: IBM Carbon UI icon — window with divided side panel, 32x32 grid
 * Usage: sidebar / panel collapse toggle
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function PanelIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <rect x="4" y="6" width="24" height="20" rx="1" />
      <path d="M20 6v20" />
    </svg>
  );
}
