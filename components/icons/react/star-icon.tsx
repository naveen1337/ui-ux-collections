/**
 * Icon: Star
 * Design type: IBM Carbon UI icon — five-pointed star, 32x32 grid
 * Usage: favourite toggle; `filled` renders a solid star
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
export function StarIcon({
  filled = false,
  className = "h-4 w-4",
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 4l3.6 7.6 8.4 1-6.2 5.7 1.7 8.2L16 22.3 8.5 26.5l1.7-8.2L4 12.6l8.4-1z" />
    </svg>
  );
}
