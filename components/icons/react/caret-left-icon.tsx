/**
 * Icon: Caret Left
 * Design type: IBM Carbon UI icon — left-pointing caret, 32x32 grid
 * Usage: previous-page navigation in pagination
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function CaretLeftIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20 26 10 16 20 6l1.4 1.4-8.6 8.6 8.6 8.6z" />
    </svg>
  );
}
