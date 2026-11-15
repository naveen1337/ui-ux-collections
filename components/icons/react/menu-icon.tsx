/**
 * Icon: Menu (hamburger)
 * Design type: IBM Carbon UI icon — three horizontal bars, 32x32 grid
 * Usage: toggles side navigation panels from the navbar
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function MenuIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <rect x="6" y="8" width="20" height="2" />
      <rect x="6" y="15" width="20" height="2" />
      <rect x="6" y="22" width="20" height="2" />
    </svg>
  );
}
