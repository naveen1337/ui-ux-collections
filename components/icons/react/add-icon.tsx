/**
 * Icon: Add
 * Design type: IBM Carbon icon — "add" (plus), 16x16 grid
 * Usage: button icons, icon-only buttons
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function AddIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8.5 3H7.5V7.5H3V8.5H7.5V13H8.5V8.5H13V7.5H8.5V3Z" />
    </svg>
  );
}
