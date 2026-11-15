/**
 * Icon: Warning
 * Design type: IBM Carbon pictogram — filled outline style, 32x32 grid
 * Usage: alert/warning state on metric cards and banners
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function WarningIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16 2a1 1 0 0 1 .87.5l14 24A1 1 0 0 1 30 28H2a1 1 0 0 1-.87-1.5l14-24A1 1 0 0 1 16 2Zm0 3.54L4.03 26h23.94L16 5.54ZM15 12h2v8h-2v-8Zm0 10h2v2h-2v-2Z" />
    </svg>
  );
}
