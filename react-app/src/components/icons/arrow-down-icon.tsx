/**
 * Icon: Arrow Down (Trend caret)
 * Design type: IBM Carbon status glyph — solid filled triangle, 32x32 grid
 * Usage: negative trend/change indicator on metric cards
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function ArrowDownIcon({ className = "h-2.5 w-2.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16 24L4 8h24L16 24Z" />
    </svg>
  );
}
