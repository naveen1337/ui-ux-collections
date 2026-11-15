/**
 * Icon: Kebab (Overflow menu, vertical)
 * Design type: IBM Carbon UI icon — minimal dot glyph, 32x32 grid
 * Usage: triggers overflow/action menus on cards and toolbars
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function KebabIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <circle cx="16" cy="8" r="2" />
      <circle cx="16" cy="16" r="2" />
      <circle cx="16" cy="24" r="2" />
    </svg>
  );
}
