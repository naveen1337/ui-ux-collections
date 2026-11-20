/**
 * Icon: Close
 * Design type: IBM Carbon icon — "close" (x), 16x16 grid
 * Usage: dismiss controls on tags, dialogs and inline notifications
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function CloseIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 4.7L11.3 4 8 7.3 4.7 4 4 4.7 7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8 12 4.7z" />
    </svg>
  );
}
