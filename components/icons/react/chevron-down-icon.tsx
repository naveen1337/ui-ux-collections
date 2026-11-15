/**
 * Icon: Chevron Down
 * Design type: IBM Carbon UI icon — downward caret, 32x32 grid
 * Usage: indicates expandable menus and selects
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16 22 6 12l1.4-1.4L16 19.2l8.6-8.6L26 12z" />
    </svg>
  );
}
