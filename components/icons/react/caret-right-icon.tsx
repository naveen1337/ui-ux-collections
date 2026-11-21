/**
 * Icon: Caret Right
 * Design type: IBM Carbon UI icon — right-pointing caret, 32x32 grid
 * Usage: next-page navigation in pagination
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function CaretRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 6l10 10-10 10-1.4-1.4 8.6-8.6-8.6-8.6z" />
    </svg>
  );
}
